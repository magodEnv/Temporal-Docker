import puppeteer from "puppeteer";

// Google scholar navarro: https://scholar.google.cl/citations?user=RNYDdjEAAAAJ&hl=en
// Google scholar ferrada: https://scholar.google.com/citations?user=VbE3-M8AAAAJ&hl=en

import {
	createPublicacion_,
	getPublicaciones_,
	getPublicacionById_,
	updatePublicacion_,
	deletePublicacion_,
} from "../persintence/repository/publicaciones.repository.js";

export async function getPublicaciones(req, res) {
	getPublicaciones_().then(
		(data) => {
			console.log(JSON.stringify(data));
			res.status(200).json({ status: true, data: data });
		},
		(error) => {
			res.status(400).json({ status: false, error: error.message });
		}
	);
}

export async function updatePublicacion(req, res) {
	const { id } = req.params;
	const { title, year_publi, url } = req.body;
	const publicacion = {
		id,
		title,
		year_publi,
		url,
	};
	updatePublicacion_(publicacion).then(
		(msg) => {
			res.status(200).json({ status: true, msg: msg });
		},
		(error) => {
			res.status(400).json({ status: false, error: error.message });
		}
	);
}

export async function deletePublicacion(req, res) {
	console.log("deleting publicacion");
	const { id } = req.params;
	deletePublicacion_(id).then(
		(msg) => {
			res.status(200).json({ status: true, msg: msg });
		},
		(error) => {
			res.status(400).json({ status: false, error: error.message });
		}
	);
}

export async function getPublicacionById(req, res) {
	const { id } = req.params;
	getPublicacionById_(id).then(
		(data) => {
			res.status(200).json({ status: true, data: data });
		},
		(error) => {
			res.status(400).json({ status: false, error: error.message });
		}
	);
}

export async function createPublicacion(req, res) {
	console.log("-- Starting scraping --");

	const savedPublications = []; // Array para almacenar las publicaciones creadas

	try {
		const { urls } = req.body;

		if (!Array.isArray(urls)) {
			return res.status(400).json({
				message: "urls debe ser un array",
				status: 400,
			});
		}

		// Validar la estructura de los URLs
		for (const urlData of urls) {
			if (!urlData.url || !urlData.interval) {
				return res.status(400).json({
					message: "Cada elemento debe tener url e interval",
					status: 400,
				});
			}
		}

		// Configurar los trabajos de scraping
		await Promise.all(
			urls.map(async ({ url, interval }) => {
				console.log(
					`Configurando scraping para ${url} con intervalo ${interval}`
				);

				try {
					console.log(`Iniciando scraping para ${url}`);
					const browser = await puppeteer.launch({
						headless: true,
						args: ["--no-sandbox", "--disable-setuid-sandbox"],
					});

					const page = await browser.newPage();
					await page.goto(url, { waitUntil: "networkidle0" });

					const publications = await scrapePublications(page);
					await browser.close();

					console.log(
						`Publicaciones obtenidas de ${url}:`,
						publications
					);

					for (const publication of publications) {
						if (!publication.title) {
							console.error(
								"Publicación sin título detectada:",
								publication
							);
							continue;
						}

						try {
							const createdPublication =
								await createPublicacionIfNotExists(publication);

							if (createdPublication) {
								savedPublications.push(createdPublication);
								console.log(
									`Publicación creada/verificada: ${publication.title}`
								);
							}
						} catch (error) {
							console.error(
								`Error al procesar publicación: ${publication.title}`,
								error
							);
						}
					}
				} catch (error) {
					console.error(
						`Error en el proceso de scraping para ${url}:`,
						error
					);
				}
			})
		);

		// Responder con las publicaciones creadas
		return res.json({
			message: "Scraping completado correctamente",
			savedPublications,
			status: 200,
		});
	} catch (error) {
		console.error("Error al configurar los trabajos de scraping:", error);
		return res.status(500).json({
			message: "Error interno del servidor",
			error: error.message,
			status: 500,
		});
	}
}

async function createPublicacionIfNotExists(publication) {
	if (!publication.title) {
		throw new Error("El título es requerido");
	}

	try {
		const result = await createPublicacion_(publication);
		return result;
	} catch (error) {
		if (error.message === "Publication already exists") {
			console.log(`Publicación ya existe: ${publication.title}`);
			return null;
		}
		throw error;
	}
}

async function scrapePublications(page) {
	const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

	console.log("------------------- Starting New Scrape --------------");

	try {
		await page.evaluate(() => {
			const button = document.querySelector(
				"button#gsc_bpf_more.gs_btnPD.gs_in_ib.gs_btn_flat.gs_btn_lrge.gs_btn_lsu"
			);
			if (button) {
				button.scrollIntoView({ behavior: "smooth", block: "center" });
			}
		});

		await delay(1000);

		// Intentar hacer clic en el botón
		const button = await page.$(
			"button#gsc_bpf_more.gs_btnPD.gs_in_ib.gs_btn_flat.gs_btn_lrge.gs_btn_lsu"
		);

		if (button) {
			console.log("Clicking 'Show more' button...");
			const box = await button.boundingBox();
			if (box) {
				await page.mouse.click(
					box.x + box.width / 2,
					box.y + box.height / 2
				);

				// Esperar un retraso para cargar más publicaciones
				await delay(3000);
			}
		} else {
			console.log("'Show more' button not found.");
		}

		// Proceed with scraping publications
		await page.waitForSelector("#gsc_a_b > .gsc_a_tr", { timeout: 5000 });

		const publications = await page.$$("#gsc_a_b > .gsc_a_tr");
		let articles = [];

		for (const publication of publications) {
			const year_publi = await page.evaluate(
				(el) => el.querySelector("span.gs_oph")?.textContent || "",
				publication
			);

			if (year_publi && year_publi.split(",")[1]?.trim() >= "2018") {
				const title = await page.evaluate(
					(el) => el.querySelector(".gsc_a_at")?.textContent || null,
					publication
				);

				if (!title) {
					console.error(
						"Error: Título no encontrado para una publicación"
					);
					continue;
				}

				const authors = await page.evaluate(
					(el) => el.querySelector(".gs_gray")?.textContent || "",
					publication
				);

				let baseUrl = "https://scholar.google.cl";
				let citations = await page.evaluate(
					(el) =>
						el.querySelector(".gsc_a_at")?.getAttribute("href") ||
						"",
					publication
				);
				let url = `${baseUrl}${citations}`;

				articles.push({
					title,
					authors,
					url,
					year_publi: year_publi.split(",")[1].trim(),
				});
			}
		}

		return articles;
	} catch (error) {
		console.error("Error en scrapePublications:", error);
		throw error;
	}
}

export const getPersonasByPublicacionId = async (req, res) => {
	const { publicacionId } = req.params;

	// Verifica que el ID no sea undefined
	if (!publicacionId) {
		return res.status(400).json({
			status: false,
			error: "El ID de la publicacion es necesario.",
		});
	}

	try {
		const data = await getPersonasByPublicacionId_(publicacionId);
		res.status(200).json({ status: true, data: data });
	} catch (error) {
		res.status(500).json({ status: false, error: error.message });
	}
};

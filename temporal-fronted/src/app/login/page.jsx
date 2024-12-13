"use client";
import { useState } from "react";
import { useRouter } from 'next/navigation'; // Importar useRouter

export default function Login() {
	const [name, setName] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState("");
	const router = useRouter(); // Inicializar router

	const handleSubmit = async (e) => {
		e.preventDefault();

		try {
			const res = await fetch("/api/login", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					name,
					password,
				}),
			});

			if (!res.ok) {
				throw new Error(`API request failed with status ${res.status}`);
			}

			const data = await res.json();

			// Comprobar si el login fue exitoso y redirigir
			if (data.status === 200) {
				router.push("/dashboard"); // Redirigir a /dashboard
			} else {
				setError(data.message || "Invalid credentials");
			}

		} catch (err) {
			console.error("Error in login request:", err);
			setError("An error occurred. Please try again later.");
		}
	};
	return (
		<div
			className="flex items-center justify-center h-screen bg-cover bg-center"
			style={{ backgroundImage: 'url("/bgpicture.jpg")' }}
		>
			<div className="flex flex-col items-center bg-white p-8 rounded-lg shadow-lg w-full max-w-sm">
				<h1 className="text-black text-3xl font-bold mb-6">Sign In</h1>
				<form onSubmit={handleSubmit} className="w-full">
					<div className="mb-4">
						<label
							htmlFor="name"
							className="block text-gray-700 font-bold mb-2"
						>
							{" "}
							  Name:
						</label>
						<input
							id="name"
							type="text"
							className="w-full   
 px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-blue-500 focus:border-blue-500"
							placeholder="Escribe tu nombre"
							value={name}
							onChange={(e) => setName(e.target.value)}
						/>
					</div>
					<div className="mb-6">
						<label
							htmlFor="password"
							className="block text-gray-700 font-bold mb-2"
						>
							Password:
						</label>
						<input
							id="password"
							type="password"
							className="w-full   
 px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-blue-500 focus:border-blue-500"
							placeholder="Escribe tu contraseña"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
						/>
					</div>
					<button
						type="submit"
						className="w-full bg-blue-500 text-white font-semibold   
 py-2 px-4 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300   
 text-center"
					>
						Sign In
					</button>
					{error && <p className="text-red-500 mt-4">{error}</p>}
				</form>
			</div>
		</div>
	);
}

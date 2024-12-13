import Link from "next/link";

const PublicationCard = ({ title, year, authors, url }) => {
	return (
		<div>
			{url ? (
				<a
					href={url}
					target="_blank"
					rel="noopener noreferrer"
					className="w-full flex p-3 hover:bg-slate-500 duration-300 cursor-pointer"
				>
					<div className="flex justify-center w-20">
						<p className="font-bold text-lg">{year}</p>
					</div>
					<div className="pl-4">
						<h1 className="text-xl hover:underline">{title}</h1>
						<p className="italic font-light">{authors}</p>
					</div>
				</a>
			) : (
				<Link
					href="#"
					className="w-full flex p-3 hover:bg-slate-500 duration-300 cursor-pointer"
				>
					<div className="flex justify-center w-20">
						<p className="font-bold text-lg">{year}</p>
					</div>
					<div className="pl-4">
						<h1 className="text-xl">{title}</h1>
						<p className="italic font-light">{authors}</p>
					</div>
				</Link>
			)}
		</div>
	);
};

export default PublicationCard;

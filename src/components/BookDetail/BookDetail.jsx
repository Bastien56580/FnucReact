export default function BookDetail({ book }) {
	return (
		<div>
			<h1>{"Détail d'article"}</h1>
			<div>
				<img src={book.cover_url} alt="Book Cover" />
				<div>
					<h5>Titre : {book.title}</h5>
					<p>Résumé : {book.resume}</p>
					<p>Auteur : {book.author}</p>
				</div>
			</div>
		</div>
	);
}

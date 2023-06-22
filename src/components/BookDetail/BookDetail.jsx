import './BookDetail.scss';
export default function BookDetail({ book }) {
	return (
		<div className="bookDetail">
			<h1 className="bookDetail__title">{"Détail d'article"}</h1>
			<div className="bookDetail__content">
				<img src={book.image} alt="Book Cover" />
				<div className="bookDetail__content--detail">
					<p>Titre : {book.title}</p>
					<p>Résumé : {book.resume}</p>
					<p>Auteur : {book.author}</p>
				</div>
			</div>
		</div>
	);
}

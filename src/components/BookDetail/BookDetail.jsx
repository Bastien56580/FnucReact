import './BookDetail.scss';

/**
 * Apperçu du détail d'un livre
 * @param {object} param0 
 *  - book  : {
 * 				author : string
 * 				title : string,
 * 				resume : string
 *  			image : string
 * 			}
 * @returns 
 */
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

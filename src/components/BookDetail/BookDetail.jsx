export default function BookDetail({ book }) {
  return (
    <div className="container w-75">
      <h1>{"Détail d'article"}</h1>
      <div className="card">
        <img src={book.cover_url} className="card-img-top" alt="Book Cover" />
        <div className="card-body">
          <h5 className="card-title">Titre : {book.title}</h5>
          <p className="card-text">Résumé : {book.resume}</p>
          <p className="card-text">Auteur : {book.author}</p>
        </div>
      </div>
    </div>
  );
}

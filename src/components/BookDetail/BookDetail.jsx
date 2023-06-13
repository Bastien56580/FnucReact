import React from 'react'

export default function BookDetail({book}) {
      return (
        <div>
          <h1>Visuel de détail d'article</h1>
          <h1>{book.titre}</h1>
          <h2>{book.description}</h2>
          <h3>{book.price}</h3>
        </div>
      );
}
    
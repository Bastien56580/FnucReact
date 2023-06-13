import React from 'react'
import Navbar from '../../components/Navbar/Navbar'
export default function BookDetail({book}) {
      return (<>
        <Navbar/>
        <div>
          <h1>Visuel de détail d'article</h1>
          <h1>{book.titre}</h1>
          <h2>{book.description}</h2>
          <h3>{book.author}</h3>
        </div>
      </>
      );
}
    
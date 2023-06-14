import React, { useState } from 'react';

export default function AddBookFormAdmin() {
	const [title, setTitle] = useState('');
	const [author, setAuthor] = useState('');
	const [resume, setResume] = useState('');
	const [coverUrl, setCoverUrl] = useState('');
	const [price, setPrice] = useState(0);
	const [stock, setStock] = useState(0);

	const handleSubmit = (e) => {
		e.preventDefault();
		alert(`send data`);
	};

	return (
		<div>
			<input
				type="text"
				placeholder="Titre"
				value={title}
				onChange={(e) => setTitle(e.target.value)}
			/>
			<input
				type="text"
				placeholder="Auteur"
				value={author}
				onChange={(e) => setAuthor(e.target.value)}
			/>
			<input
				type="text"
				placeholder="Résumé"
				value={resume}
				onChange={(e) => setResume(e.target.value)}
			/>
			<input
				type="text"
				placeholder="Url de la couverture"
				value={coverUrl}
				onChange={(e) => setCoverUrl(e.target.value)}
			/>
			<input
				type="text"
				placeholder="Prix"
				value={price}
				onChange={(e) => setPrice(e.target.value)}
			/>
			<input
				type="text"
				placeholder="Stock"
				value={stock}
				onChange={(e) => setStock(e.target.value)}
			/>

			<input type="submit" value="Valider" onClick={handleSubmit} />
		</div>
	);
}

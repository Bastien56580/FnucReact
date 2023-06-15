import React, { useState } from 'react';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';

export default function AddBookFormAdmin() {
	const [title, setTitle] = useState('');
	const [author, setAuthor] = useState('');
	const [resume, setResume] = useState('');
	const [coverUrl, setCoverUrl] = useState('');
	const [price, setPrice] = useState(0);
	const [stock, setStock] = useState(0);

	const handleSubmit = (e) => {
		e.preventDefault();
		// Create user data object
		const userData = {
			title: title,
			author: author,
			resume: resume,
			cover_url: coverUrl,
			price: price,
			stock: stock,
		};

		// Send a POST request to create a user
		axios
			.post('https://apimysql-1-r1261081.deta.app/books/', userData, {
				withCredentials: true,
			})
			.then((response) => {
				// Handle successful response
				if (response.status === 201) {
					toast.success('Book created!'); // Display success toast message
				} else {
					toast.error(response.data.detail); // Display error toast message with details
				}
			})
			.catch((error) => {
				// Handle error response
				toast.error(error.response.data.detail); // Display error toast message with details
			});
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
			<Toaster /> {/* Toast container for displaying messages */}
		</div>
	);
}

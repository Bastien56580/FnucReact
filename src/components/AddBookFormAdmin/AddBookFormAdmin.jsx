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

	const handleCancel = (e) => {
		e.preventDefault();
		window.location.href = '/admin/books';
	};

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
		<div className="container">
			<div className="row">
				<div className="col-md-6">
					<h2 className="pt-5 pb-2">Ajouter un livre</h2>
					<form>
						<div className="mb-3">
							<input
								type="text"
								className="form-control"
								placeholder="Titre"
								value={title}
								onChange={(e) => setTitle(e.target.value)}
							/>
						</div>
						<div className="mb-3">
							<input
								type="text"
								className="form-control"
								placeholder="Auteur"
								value={author}
								onChange={(e) => setAuthor(e.target.value)}
							/>
						</div>
						<div className="mb-3">
							<input
								type="text"
								className="form-control"
								placeholder="Résumé"
								value={resume}
								onChange={(e) => setResume(e.target.value)}
							/>
						</div>
						<div className="mb-3">
							<input
								type="text"
								className="form-control"
								placeholder="Url de la couverture"
								value={coverUrl}
								onChange={(e) => setCoverUrl(e.target.value)}
							/>
						</div>
						<div className="mb-3">
							<input
								type="text"
								className="form-control"
								placeholder="Prix"
								value={price}
								onChange={(e) => setPrice(e.target.value)}
							/>
						</div>
						<div className="mb-3">
							<input
								type="text"
								className="form-control"
								placeholder="Stock"
								value={stock}
								onChange={(e) => setStock(e.target.value)}
							/>
						</div>
						<button className="btn btn-primary" onClick={handleSubmit}>
							Valider
						</button>
						<button className="btn btn-secondary" onClick={handleCancel}>
							Retour
						</button>
					</form>
					<Toaster /> {/* Toast container for displaying messages */}
				</div>
			</div>
		</div>
	);
}

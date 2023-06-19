import { useState, useEffect } from 'react';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import { useParams } from 'react-router-dom';

export default function UpdateBookFormAdmin() {
	const baseUrl = sessionStorage.getItem("REACT_APP_BACK_URL");
	const [title, setTitle] = useState('');
	const [author, setAuthor] = useState('');
	const [resume, setResume] = useState('');
	const [coverUrl, setCoverUrl] = useState('');
	const [price, setPrice] = useState(0);
	const [stock, setStock] = useState(0);

	const { id } = useParams();

	useEffect(() => {
		// Axios request or fetch the book from the id info and setMyData
		// In the meantime, we are using the mock
		axios
			.get(baseUrl + '/books/' + id, {
				withCredentials: true,
			})
			.then((response) => {
				// Handle successful response
				setTitle(response.data.title);
				setAuthor(response.data.author);
				setResume(response.data.resume);
				setCoverUrl(response.data.cover_url);
				setPrice(response.data.price);
				setStock(response.data.stock);
			})
			.catch((error) => {
				// Handle error response
				toast.error(error.response.data.detail); // Display error toast message with details
			});
	}, [id]);

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
			.patch(
				baseUrl + `/books/${id}`,
				userData,
				{
					withCredentials: true,
				}
			)
			.then((response) => {
				// Handle successful response
				if (response.status === 200) {
					toast.success('Book updated!'); // Display success toast message
				} else {
					toast.error(response.data.detail); // Display error toast message with details
				}
			})
			.catch((error) => {
				// Handle error response
				toast.error(error.response.data.detail); // Display error toast message with details
			});
	};

	const handleCancel = (e) => {
		e.preventDefault();
		window.location.href = '/admin/books';
	};

	return (
		<div className="container">
			<div className="row">
				<div className="col-md-6">
					<h2 className="pt-5 pb-2">Editer un livre</h2>
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
						<button className="btn btn-primary mr-2" onClick={handleSubmit}>
							Valider
						</button>
						<button className="btn btn-secondary" onClick={handleCancel}>
							Retour
						</button>
					</form>
				</div>
			</div>
			<Toaster /> {/* Toast container for displaying messages */}
		</div>

	);
}

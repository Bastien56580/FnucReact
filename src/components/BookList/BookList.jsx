import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import toast, { Toaster } from 'react-hot-toast';
import { useState, useEffect } from 'react';
import axios from 'axios';
import './BookList.scss';

export default function BookList() {
	const [books, setBooks] = useState([]);
	const baseUrl = sessionStorage.getItem('REACT_APP_BACK_URL');

	useEffect(() => {
		axios
			.get(baseUrl + '/books/', {
				withCredentials: true,
			})
			.then((response) => {
				// Handle successful response
				setBooks(response.data);
			})
			.catch((error) => {
				// Handle error response
				toast.error(error.response.data.detail); // Display error toast message with details
			});
	}, []);

	const handleDelete = (id) => {
		axios
			.delete(baseUrl + `/books/${id}`, {
				withCredentials: true,
			})
			.then(() => {
				// Remove the deleted record from the books array
				setBooks((prevBooks) =>
					prevBooks.filter((book) => book.id !== id)
				);
				toast.success('Enregistrement supprimé !');
			})
			.catch((error) => {
				toast.error(error.response.data.detail); // Display error toast message with details
			});
	};

	const handleEdit = (id) => {
		window.location.href = `/admin/books/edit/${id}`;
	};

	return (
		<div className="bookList">
			<h1 className="bookList__title">Liste des livres</h1>
			<table className="bookList__table">
				<thead>
					<tr>
						<th>Titre</th>
						<th>Auteur</th>
						<th>Résumé</th>
						<th>Image</th>
						<th>Prix</th>
						<th>Stock</th>
						<th></th>
						<th>
							<AddCircleIcon
								onClick={() =>
									(window.location.href =
										'/admin/books/create')
								}
							/>
						</th>
					</tr>
				</thead>
				<tbody>
					{books.map((element) => {
						return (
							<tr key={element.id}>
								<td>{element.title}</td>
								<td>{element.author}</td>
								<td>{element.resume}</td>
								<td>
									<img
										src={element.cover_url}
										alt="Book Cover"
									/>
								</td>

								<td>{element.price}</td>
								<td>{element.stock}</td>
								<td>
									<EditIcon
										onClick={() => {
											handleEdit(element.id);
										}}
									/>
								</td>
								<td>
									<DeleteIcon
										onClick={() => handleDelete(element.id)}
									/>
								</td>
							</tr>
						);
					})}
				</tbody>
			</table>
			<Toaster /> {/* Toast container for displaying messages */}
		</div>
	);
}

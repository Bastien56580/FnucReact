import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import toast, { Toaster } from 'react-hot-toast';
import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function BookList() {
	const [books, setBooks] = useState([]);

	useEffect(() => {
		axios
			.get('https://apimysql-1-r1261081.deta.app/books/', {
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
			.delete(`https://apimysql-1-r1261081.deta.app/books/${id}`, {
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

	return (
		<div>
			<Toaster /> {/* Toast container for displaying messages */}
			<table>
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
					{books.map((element, index) => {
						return (
							<tr key={element.id}>
								<td>{element.title}</td>
								<td>{element.author}</td>
								<td>{element.summary}</td>
								<td>{element.coverPage}</td>
								<td>{element.price}</td>
								<td>{element.stock}</td>
								<td>
									<EditIcon />
								</td>
								<td>
									<DeleteIcon
										onClick={() => handleDelete(element.id)}
										style={{ cursor: 'pointer' }} // Add CSS to change cursor on hover
									/>
								</td>
							</tr>
						);
					})}
				</tbody>
			</table>
		</div>
	);
}

import toast, { Toaster } from 'react-hot-toast';
import { useState, useEffect } from 'react';
import axios from 'axios';

export default function ListBookByTopic(topicId) {
	const [books, setBooks] = useState([]);
	const baseUrl = sessionStorage.getItem('REACT_APP_BACK_URL');

	useEffect(() => {
		if (topicId.topicId) {
			console.log(baseUrl + '/topics/' + topicId.topicId + '/books/');
			axios
				// .get(baseUrl + `/topics/${topicId}/books/`, {
				.get(baseUrl + '/topics/' + topicId.topicId + '/books/', {
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
		}
	}, [topicId.topicId]);

	const handleDetailBook = (id) => {
		window.location.href = `/detail-order/${id}`;
	};

	return (
		<div>
			<div>
				<div>
					<h2>Liste des livres</h2>
					<table>
						<thead>
							<tr>
								<th>
									<b>Titre</b>
								</th>
								<th>
									<b>Auteur</b>
								</th>
								<th>
									<b>Image</b>
								</th>
								<th>
									<b>Prix</b>
								</th>
							</tr>
						</thead>
						<tbody>
							{books.map((element) => {
								return (
									<tr
										key={element.id}
										onClick={() => {
											handleDetailBook(element.id);
										}}
									>
										<td>{element.title}</td>
										<td>{element.author}</td>
										<td>
											<img
												src={element.cover_url}
												alt="Book Cover"
											/>
										</td>

										<td>{element.price}</td>
									</tr>
								);
							})}
						</tbody>
					</table>
					<Toaster /> {/* Toast container for displaying messages */}
				</div>
			</div>
		</div>
	);
}

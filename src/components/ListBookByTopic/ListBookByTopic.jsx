import toast, { Toaster } from 'react-hot-toast';
import { useState, useEffect } from 'react';
import axios from 'axios';
import mockList from './mock/mockbook.json';
import './ListBookByTopic.scss';
import mockList from './mock/mockbook.json';

export default function ListBookByTopic(topicId) {
	const [books, setBooks] = useState([]);
	const baseUrl = sessionStorage.getItem('REACT_APP_BACK_URL');
	const mock = sessionStorage.getItem('REACT_APP_MOCK');

	useEffect(() => {
		if (mock === 'true') {
			setBooks(mockList);
		} else if (mock === 'false') {
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
		}
	}, [topicId.topicId]);

	const handleDetailBook = (id) => {
		window.location.href = `/detail-order/${id}`;
	};

	return (
		<div className="listBook">
			<h1 className="listBook__title">Liste des livres</h1>
			<table className="listBook__table">
				<thead>
					<tr>
						<th>Titre</th>
						<th>Auteur</th>
						<th>Image</th>
						<th>Prix</th>
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
	);
}

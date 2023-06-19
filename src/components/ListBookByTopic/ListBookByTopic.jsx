import toast, { Toaster } from 'react-hot-toast';
import { useState, useEffect } from 'react';
import axios from 'axios';
import '../../css/adminTab.css';

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
		<div className="container">
			<div className="row justify-content-center">
				<div className="col-md-8">
					<h2 className="text-center pt-5 pb-3">Liste des livres</h2>
					<table className="table table-striped table-bordered border-dark table-responsive">
						<thead>
							<tr>
								<th scope="col">
									<b>Titre</b>
								</th>
								<th scope="col">
									<b>Auteur</b>
								</th>
								<th scope="col">
									<b>Image</b>
								</th>
								<th scope="col">
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
												className="img-thumbnail"
												style={{
													maxWidth: '160px',
													maxHeight: '75px',
												}}
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

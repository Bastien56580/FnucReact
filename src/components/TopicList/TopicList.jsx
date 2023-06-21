import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import toast, { Toaster } from 'react-hot-toast';
import { useState, useEffect } from 'react';
import axios from 'axios';
import '../../css/adminTab.css';
import mockTopic from './mock/mockTopic.json'

export default function TopicList() {
	const [topics, setTopics] = useState([]);
	const baseUrl = sessionStorage.getItem("REACT_APP_BACK_URL");
	const mock = sessionStorage.getItem("REACT_APP_MOCK");

	useEffect(() => {
		if (mock === "true") {
			setTopics(mockTopic);
		} else {
			axios
				.get(baseUrl + '/topics/', {
					withCredentials: true,
				})
				.then((response) => {
					// Handle successful response
					setTopics(response.data);
				})
				.catch((error) => {
					// Handle error response
					toast.error(error.response.data.detail); // Display error toast message with details
				});
		}
	}, []);

	const handleDelete = (id) => {
		axios
			.delete(baseUrl + `/topics/${id}`, {
				withCredentials: true,
			})
			.then(() => {
				// Remove the deleted record from the books array
				setTopics((prevBooks) =>
					prevBooks.filter((book) => book.id !== id)
				);
				toast.success('Enregistrement supprimé !');
			})
			.catch((error) => {
				toast.error(error.response.data.detail); // Display error toast message with details
			});
	};

	const handleEdit = (id) => {
		window.location.href = `/admin/topics/edit/${id}`;
	};

	return (
		<div className="container">
			<div className="row justify-content-center">
				<div className="col-md-8">
					<h2 className="text-center pt-5 pb-3">Liste des rayons</h2>
					<table className="table table-striped table-bordered border-dark table-responsive">
						<thead>
							<tr>
								<th scope="col"><b>Rayon</b></th>
								<th scope="col"><b>Illustration</b></th>
								<th></th>
								<th>
									<AddCircleIcon
										onClick={() =>
											(window.location.href = '/admin/topics/create')
										}
										className="add-icon"
									/>
								</th>
							</tr>
						</thead>
						<tbody>
							{topics.map((element) => {
								return (
									<tr key={element.id}>
										<td>{element.label}</td>
										<td>
											<img
												src={element.image}
												alt="Topic Cover"
												className="img-thumbnail"
												style={{ maxWidth: '160px', maxHeight: '75px' }}
											/>
										</td>

										<td>
											<EditIcon
												onClick={() => {
													handleEdit(element.id);
												}}
												className="edit-icon"
											/>
										</td>
										<td>
											<DeleteIcon
												onClick={() => handleDelete(element.id)}
												className="delete-icon"
											/>
										</td>
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

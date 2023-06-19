import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { useState, useEffect } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import axios from 'axios';
import '../../css/adminTab.css';

export default function ClientList() {
	const [clients, setClients] = useState([]);
	const baseUrl = sessionStorage.getItem("REACT_APP_BACK_URL");

	useEffect(() => {
		axios
			.get(baseUrl + '/customers/', {
				withCredentials: true,
			})
			.then((response) => {
				// Handle successful response
				setClients(response.data);
			})
			.catch((error) => {
				// Handle error response
				toast.error(error.response.data.detail); // Display error toast message with details
			});
	}, []);

	const handleDelete = (id) => {
		axios
			.delete(baseUrl + `/customers/${id}`, {
				withCredentials: true,
			})
			.then(() => {
				// Remove the deleted record from the books array
				setClients((previousClient) =>
					previousClient.filter((client) => client.id !== id)
				);
				toast.success('Enregistrement supprimé !');
			})
			.catch((error) => {
				toast.error(error.response.data.detail); // Display error toast message with details
			});
	};

	const handleEdit = (id) => {
		window.location.href = `/admin/clients/edit/${id}`;
	};

	return (
		<div className="container">
			<div className="row justify-content-center">
				<div className="col-md-8">
					<h2 className="text-center pt-5 pb-2">Listes des clients</h2>
					<table className="table table-striped table-bordered border-dark table-responsive">
						<thead>
							<tr>
								<th>Prénom</th>
								<th>Nom</th>
								<th>Mail</th>
								<th></th>
								<th>
									<AddCircleIcon
										onClick={() => (window.location.href = '/admin/clients/create')}
										className="add-icon"
									/>
								</th>
							</tr>
						</thead>
						<tbody>
							{clients.map((element, index) => {
								return (
									<tr key={element + '-' + index}>
										<td key={element.firstname + '-' + index}>{element.firstname}</td>
										<td key={element.lastname + '-' + index}>{element.lastname}</td>
										<td key={element.email + '-' + index}>{element.email}</td>
										<td key={'update-' + index}>
											<EditIcon
												onClick={() => { handleEdit(element.id); }}
												className="edit-icon"
											/>
										</td>
										<td key={'delete-' + index}>
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
				</div>
			</div>
			<Toaster /> {/* Toast container for displaying messages */}
		</div>
	);
}

import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { useState, useEffect } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import axios from 'axios';
import '../../css/adminTab.css';
import mockKeyword from './mock/mockKeyword.json'

export default function KeywordList2() {
	const [keywords, setKeywords] = useState([]);
	const baseUrl = sessionStorage.getItem("REACT_APP_BACK_URL");
	const mock = sessionStorage.getItem("REACT_APP_MOCK");


	useEffect(() => {
		if (mock === "true") {
			setKeywords(mockKeyword);
		}else {
		axios
			.get(baseUrl + '/keywords/', {
				withCredentials: true,
			})
			.then((response) => {
				// Handle successful response
				setKeywords(response.data);
			})
			.catch((error) => {
				// Handle error response
				toast.error(error.response.data.detail); // Display error toast message with details
			});
		}
	}, []);

	const handleDelete = (id) => {
		let token = sessionStorage.getItem('token');
		axios
			.delete(baseUrl + `/keywords/${id}`, {
				withCredentials: true,
				headers: {
					Authorization: `Bearer ${token}`,
				},
			})
			.then(() => {
				// Remove the deleted record from the books array
				setKeywords((previousClient) =>
					previousClient.filter((client) => client.id !== id)
				);
				toast.success('Enregistrement supprimé !');
			})
			.catch((error) => {
				toast.error(error.response.data.detail ||error.response.data.message); // Display error toast message with details
			});
	};

	const handleEdit = (id) => {
		window.location.href = `/admin/keywords/edit/${id}`;
	};

	return (
		<div className="container">
			<div className="row justify-content-center">
				<div className="col-md-8">
					<h2 className="text-center pt-5 pb-2">Listes des mots clés</h2>
					<table className="table table-striped table-bordered border-dark table-responsive">
						<thead>
							<tr>
								<th>Mot clé</th>
								<th></th>
								<th>
									<AddCircleIcon
										onClick={() => (window.location.href = '/admin/keywords/create')}
										className="add-icon"
									/>
								</th>
							</tr>
						</thead>
						<tbody>
							{keywords.map((element, index) => {
								return (
									<tr key={element + '-' + index}>
										<td key={element.label + '-' + index}>{element.label}</td>
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

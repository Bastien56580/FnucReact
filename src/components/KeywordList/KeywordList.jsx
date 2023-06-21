import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { useState, useEffect } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import axios from 'axios';
import './KeywordList.scss';

export default function KeywordList() {
	const [limit] = useState(10);
	const [offset, setOffset] = useState(0);
	const [keywords, setKeywords] = useState([]);
	const baseUrl = sessionStorage.getItem('REACT_APP_BACK_URL');

	useEffect(() => {
		axios
			.get(baseUrl + `/keywords/?limit=${limit}&offset=${offset}`, {
				withCredentials: true,
			})
			.then((response) => {
				// Handle successful response
				setKeywords(response.data);
			})
			.catch((error) => {
				// Handle error response
				toast.error(
					error.response.data.detail || error.response.data.message
				); // Display error toast message with details
			});
	}, [offset]);

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
				toast.error(
					error.response.data.detail || error.response.data.message
				); // Display error toast message with details
			});
	};

	const handleEdit = (id) => {
		window.location.href = `/admin/keywords/edit/${id}`;
	};

	return (
		<div className="keywordList">
			<h1 className="keywordList__title">Listes des mots clés</h1>
			<table className="keywordList__table">
				<thead>
					<tr>
						<th>Mot clé</th>
						<th></th>
						<th>
							<AddCircleIcon
								onClick={() =>
									(window.location.href =
										'/admin/keywords/create')
								}
							/>
						</th>
					</tr>
				</thead>
				<tbody>
					{keywords.map((element, index) => {
						return (
							<tr key={element + '-' + index}>
								<td key={element.label + '-' + index}>
									{element.label}
								</td>
								<td key={'update-' + index}>
									<EditIcon
										onClick={() => {
											handleEdit(element.id);
										}}
									/>
								</td>
								<td key={'delete-' + index}>
									<DeleteIcon
										onClick={() => handleDelete(element.id)}
									/>
								</td>
							</tr>
						);
					})}
				</tbody>
			</table>
			<div className="search__pagination">
				{offset != 0 ? (
					<button onClick={() => setOffset(offset - limit)}>
						Page Précédente
					</button>
				) : (
					<button disabled>Page Précédente</button>
				)}
				{<b>page {offset / limit + 1}</b>}
				{keywords.length >= limit ? (
					<button onClick={() => setOffset(offset + limit)}>
						Page Suivante
					</button>
				) : (
					<button disabled>Page Suivante</button>
				)}
			</div>
			<Toaster /> {/* Toast container for displaying messages */}
		</div>
	);
}

import { useEffect, useState } from 'react';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import './CategoryList.scss';

// Mock list since you don't have a backend to test with yet
import mockList from './mock/mockList.json';

/**
 * Liste des livres enregistrés
 */
export default function ProfileList(handleTopicId) {
	const [limit] = useState(10);
	const [offset, setOffset] = useState(0);
	const [myData, setMyData] = useState('');
	const baseUrl = sessionStorage.getItem('REACT_APP_BACK_URL');
	const mock = sessionStorage.getItem('REACT_APP_MOCK');

	useEffect(() => {
		if (mock === 'true') {
			setMyData(mockList);
		} else if (mock === 'false') {
			axios
				.get(baseUrl + `/topics/?limit=${limit}&offset=${offset}`, {
					withCredentials: true,
				})
				.then((response) => {
					// Handle successful response
					setMyData(response.data);
				})
				.catch((error) => {
					// Handle error response
					toast.error(error.response.data.detail); // Display error toast message with details
				});
		}
	}, [offset]);

	return (
		<div className="categoryList">
			<h1 className="categoryList__title">Liste des rayons</h1>
			<table className="categoryList__table">
				<thead>
					<tr>
						<th>Rayon</th>
						<th>Illustration</th>
					</tr>
				</thead>
				<tbody>
					{myData !== '' ? (
						myData.map((item) => (
							<tr
								key={item.id}
								onClick={() => {
									handleTopicId.handleTopicId(item.id);
								}}
							>
								<td>{item.label}</td>
								<td>
									<img src={item.image} alt="Topic Cover" />
								</td>
							</tr>
						))
					) : (
						<tr>
							<td>Loading</td>
						</tr>
					)}
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
				{myData.length >= limit ? (
					<button onClick={() => setOffset(offset + limit)}>
						Page Suivante
					</button>
				) : (
					<button disabled>Page Suivante</button>
				)}
			</div>{' '}
			<Toaster /> {/* Toast container for displaying messages */}
		</div>
	);
}

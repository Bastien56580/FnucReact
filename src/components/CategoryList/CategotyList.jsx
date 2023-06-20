import { useEffect, useState } from 'react';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import './CategoryList.scss';

// Mock list since you don't have a backend to test with yet
import mockList from './mock/mockList.json';

export default function ProfileList(handleTopicId) {
	const [myData, setMyData] = useState('');
	const baseUrl = sessionStorage.getItem('REACT_APP_BACK_URL');
	const mock = sessionStorage.getItem('REACT_APP_MOCK');

	useEffect(() => {
		if (mock === 'true') {
			setMyData(mockList);
		} else if (mock === 'false') {
			axios
				.get(baseUrl + '/topics/', {
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
	}, []);

	return (
		<div className="categoryList">
			<h1 className="categoryList__title">Topic List</h1>
			<table className="categoryList__table">
				<thead>
					<tr>
						<th>Name</th>
						<th>Topic URL</th>
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
									<img
										src={item.topic_url}
										alt="Topic Cover"
									/>
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
			<Toaster /> {/* Toast container for displaying messages */}
		</div>
	);
}

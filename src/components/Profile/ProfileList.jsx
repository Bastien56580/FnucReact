import { useEffect, useState } from 'react';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import mockList from './mock/mockList.json';

export default function ProfileList() {
	const [myData, setMyData] = useState('');
	const baseUrl = sessionStorage.getItem('REACT_APP_BACK_URL');
	const mock = sessionStorage.getItem('REACT_APP_MOCK');
	useEffect(() => {
		if (mock === 'true') {
			setMyData(mockList);
		} else if (mock === 'false') {
			let token = sessionStorage.getItem('token');

			axios
				.get(baseUrl + '/customers/' + token.id, {
					withCredentials: true,
					headers: {
						Authorization: `Bearer ${token}`,
					},
				})
				.then((response) => {
					// Handle successful response
					setMyData(response.data);
				})
				.catch((error) => {
					// Handle error response
					console.log(error);
					toast.error(error.response.data.message || error.response.data.detail); // Display error toast message with details
				});
		}
	}, []);

	return (
		<div>
			<div>
				<div>
					<h5>Information du profile :</h5>
					<table>
						{myData !== '' ? (
							<tbody>
								<tr>
									<td>Nom:</td>
									<td>{myData.firstname}</td>
								</tr>
								<tr>
									<td>Prénom:</td>
									<td>{myData.lastname}</td>
								</tr>
								<tr>
									<td>Email:</td>
									<td>{myData.email}</td>
								</tr>
								<tr>
									<td>Total dépensé :</td>
									<td>{myData.cumulative_sales}</td>
								</tr>
							</tbody>
						) : (
							<tbody>
								<tr>
									<td>Loading</td>
								</tr>
							</tbody>
						)}
					</table>
				</div>
			</div>
			<Toaster />
		</div>
	);
}

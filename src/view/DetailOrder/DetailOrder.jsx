import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';

import Order from '../../components/Order/Order.jsx';
import BookDetail from '../../components/BookDetail/BookDetail.jsx';
import Navbar from '../../components/Navbar/Navbar';

import mockB from './mock/mockBook.json';

export default function DetailOrder() {
	const baseUrl = sessionStorage.getItem('REACT_APP_BACK_URL');
	const mock = sessionStorage.getItem('REACT_APP_MOCK');
	const [myData, setMyData] = useState('');
	const { id } = useParams(); // Récupération de la valeur 'id' depuis l'URL

	const token = sessionStorage.getItem('token');

	useEffect(() => {
		if (mock === 'true') {
			setMyData(mockB);
		} else {
			axios
				.get(baseUrl + '/books/' + id, {
					withCredentials: true,
				})
				.then((response) => {
					// Handle successful response
					setMyData(response.data);
				})
				.catch((error) => {
					// Handle error response
					toast.error(error.response.data.detail || error.response.data.message ); // Display error toast message with details
				});
		}
	}, [id]);

	return (
		<div className="DetailOrder">
			<Navbar />
			{myData !== '' ? (
				<div className="container">
					<div className="row">
						<div className="col-md-6">
							<BookDetail book={myData} />
						</div>
						{token ? (
							<>
								<div className="col-md-6">
									<Order book={myData} />
								</div>
							</>
						) : (
							<></>
						)}
					</div>
				</div>
			) : (
				<p>Loading</p>
			)}
			<Toaster />
		</div>
	);
}

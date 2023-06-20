import './ProfileGraph.scss';
import toast, { Toaster } from 'react-hot-toast';
import { useEffect, useState } from 'react';
import Plot from 'react-plotly.js';
import randomColor from 'randomcolor';
import axios from 'axios';
import mockGraph from './mock/mockGraph.json';
import jwt_decode from 'jwt-decode';

export default function ProfileGraph() {
	const [myData, setMyData] = useState('');
	const baseUrl = sessionStorage.getItem('REACT_APP_BACK_URL');
	const mock = sessionStorage.getItem('REACT_APP_MOCK');

	useEffect(() => {
		if (mock === 'true') {
			setMyData(mockGraph);
		} else {
			let token = jwt_decode(sessionStorage.getItem('token'));
			axios
				.get(baseUrl + '/customers/' + token.id + '/orders', {
					withCredentials: true,
					headers: {
						Authorization: `Bearer ${token}`,
					},
				})
				.then((response) => {
					const orders = response.data;
					const bookTitles = {};

					const fetchBookData = async () => {
						for (const order of orders) {
							try {
								const bookResponse = await axios.get(
									baseUrl + `/books/${order.id_book}`
								);
								const book = bookResponse.data;

								// Add book title and quantity to bookTitles object
								if (!bookTitles[book.title]) {
									bookTitles[book.title] = order.quantity;
								} else {
									bookTitles[book.title] += order.quantity;
								}
							} catch (error) {
								toast.error(error.response.data.message || error.response.data.detail);
							}
						}

						// Update state with bookTitles object
						setMyData(bookTitles);
					};

					// Fetch book data for each order
					fetchBookData();
				})
				.catch((error) => {
					toast.error(error.response.data.message || error.response.data.detail);
				});
		}
	}, []);

	const xData = Object.keys(myData);
	const yData = Object.values(myData);
	const barColors = randomColor({ count: xData.length });

	return (
		<div className="profilGraph">
			<h1 className="profilGraph__title">Ma consommation de livres</h1>
			{myData !== '' ? (
				<Plot
					className="profilGraph__graph"
					data={[
						{
							type: 'bar',
							x: xData,
							y: yData,
							marker: {
								color: barColors,
							},
						},
					]}
					layout={{
						autosize: true,
						height: 500,
						xaxis: {
							ticktext: Array.from(
								{ length: xData.length },
								() => ''
							),
							tickvals: [],
							title: 'Titre des livres',
						},
						yaxis: {
							title: "Nombre d'exemplaires achetés",
						},
					}}
					config={{
						responsive: true,
						displaylogo: false,
					}}
				/>
			) : (
				<p>Loading</p>
			)}
			<Toaster />
		</div>
	);
}

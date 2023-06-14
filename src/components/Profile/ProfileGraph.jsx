
import './ProfileGraph.scss';
import toast, { Toaster } from 'react-hot-toast';
import React, { useEffect, useState } from 'react';
import Plot from 'react-plotly.js';
import randomColor from 'randomcolor';
import axios from 'axios';

export default function ProfileGraph() {
	const [myData, setMyData] = useState({});

	useEffect(() => {
		axios
			.get('https://apimysql-1-r1261081.deta.app/customers/12/orders') //TODO : Change 12 to user id
			.then((response) => {
				const orders = response.data;
				const bookTitles = {};

				const fetchBookData = async () => {
					for (const order of orders) {
						try {
							const bookResponse = await axios.get(
								`https://apimysql-1-r1261081.deta.app/books/${order.id_book}`
							);
							const book = bookResponse.data;

							// Add book title and quantity to bookTitles object
							if (!bookTitles[book.title]) {
								bookTitles[book.title] = order.quantity;
							} else {
								bookTitles[book.title] += order.quantity;
							}
						} catch (error) {
							toast.error(error.response.data.detail);
						}
					}

					// Update state with bookTitles object
					setMyData(bookTitles);
				};

				// Fetch book data for each order
				fetchBookData();
			})
			.catch((error) => {
				toast.error(error.response.data.detail);
			});
	}, []);


	const xData = Object.keys(myData);
	const yData = Object.values(myData);
	const barColors = randomColor({ count: xData.length });

	return (
		<div className="container mt-4">
			<div className="card">
				<div className="card-body">
					<h5 className="card-title text-center">
						Quels sont les livres que j'ai achetés et en combien
						d'exemplaires ?
					</h5>
					<div className="d-flex justify-content-center">
						<div className="plot-container">
							<Plot
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
								className="w-100"
							/>
						</div>
					</div>
				</div>
			</div>
			<Toaster />
		</div>
	);
}

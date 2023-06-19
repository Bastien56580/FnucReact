
import './ProfileGraph.scss';
import toast, { Toaster } from 'react-hot-toast';
import { useEffect, useState } from 'react';
import Plot from 'react-plotly.js';
import randomColor from 'randomcolor';
import axios from 'axios';
import mockGraph from './mock/mockGraph.json'

export default function ProfileGraph() {
	const [myData, setMyData] = useState("");
	const baseUrl = sessionStorage.getItem("REACT_APP_BACK_URL");
	const mock = sessionStorage.getItem("REACT_APP_MOCK");

	useEffect(() => {
		if (mock === "true") {
			setMyData(mockGraph);

		} else {
			axios
				.get(baseUrl + '/customers/12/orders') //TODO : Change 12 to user id
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
		}
	}, []);


	const xData = Object.keys(myData);
	const yData = Object.values(myData);
	const barColors = randomColor({ count: xData.length });

	return (
		<div className="container mt-4">
			<div className="card">
				<div className="card-body">
					<h5 className="card-title text-center">
						{"Quels sont les livres que j'ai achetés et en combien d'exemplaires ?"}
					</h5>
					{myData !== "" ? (
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
					) : (
						<p>Loading</p>
					)}
				</div>
			</div>
			<Toaster />
		</div>
	);
}

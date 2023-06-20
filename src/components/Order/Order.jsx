import { useState } from 'react';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import '../../css/style.css'

export default function Order({ book }) {
	const baseUrl = sessionStorage.getItem("REACT_APP_BACK_URL");
	const price = book.price;
	const stock = book.stock;
	const id = book.id;

	//I set TVA to 20%, because why not
	const tauxTVA = '0.2';

	//all this we get from the form
	const [quantity, setQuantity] = useState(0);
	const [TVA, setTVA] = useState(0);
	const [HT, setHT] = useState(0);
	const [TTC, setTTC] = useState(0);


	//Change the pricing according to the quantity
	const handleQuantity = (e) => {
		const newQuantity = parseInt(e.target.value);
		setQuantity(newQuantity);
		setTVA((newQuantity * tauxTVA).toPrecision(4));
		setHT((newQuantity * price).toPrecision(4));
		setTTC((newQuantity * price + newQuantity * price * tauxTVA).toPrecision(4));
	};


	//handle the post request
	const handleSubmit = (e) => {
		e.preventDefault();
		// Create user data object
		const orderData = {
			"id_book": id,
			"id_customer": 12, //TODO : Find user id with authentication system
			"quantity": quantity,
		};
		// Send a POST request to create an order
		axios
			.post(baseUrl + '/orders/', orderData, {
				withCredentials: true,
			})
			.then((response) => {
				// Handle successful response
				if (response.data.id) {
					toast.success('La commande est bien réalisé !'); // Display success toast message
				} else {
					toast.error(response.data.detail); // Display error toast message with details
				}
			})
			.catch((error) => {
				// Handle error response
				toast.error(error.response.data.detail); // Display error toast message with details
			});
	};

	return (
		<div className="container mt-5 pt-5">
			<h2 className="text-center mb-5">Formulaire de commande</h2>
			<div className="row">
				<div className="col-md-6">
					<table className="table">
						<tbody>
							<tr>
								<td className="fw-bold">Prix:</td>
								<td>{price} €</td>
							</tr>
							<tr>
								<td className="fw-bold">Stock:</td>
								<td>{stock}</td>
							</tr>
							<tr>
								<td className="fw-bold">Quantité:</td>
								<td>
									<label>
										<input
											type="number"
											className="form-control"
											placeholder="Quantité"
											min="0"
											max={stock}
											value={quantity}
											onChange={(e) => handleQuantity(e)}
										/>
									</label>
								</td>
							</tr>
						</tbody>
					</table>
				</div>
				<div className="col-md-6">
					<table className="table">
						<tbody>
							<tr>
								<td className="fw-bold">Taux de TVA:</td>
								<td>{tauxTVA}</td>
							</tr>
							<tr>
								<td className="fw-bold">TVA:</td>
								<td>{TVA}</td>
							</tr>
							<tr>
								<td className="fw-bold">HT:</td>
								<td>{HT}</td>
							</tr>
							<tr>
								<td className="fw-bold">TTC:</td>
								<td>{TTC}</td>
							</tr>
						</tbody>
					</table>
				</div>
			</div>
			<div className="row">
				<div className="col-12 text-center">
					<input
						type="submit"
						className="btn btn-custom-primary"
						value="Valider"
						onClick={handleSubmit}
					/>
				</div>
			</div>
			<Toaster /> {/* Toast container for displaying messages */}
		</div>

	);
}

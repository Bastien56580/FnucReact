import { useState } from 'react';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';

export default function Order({ book }) {
	const baseUrl = sessionStorage.getItem('REACT_APP_BACK_URL');
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
		setTVA(newQuantity * tauxTVA);
		setHT(newQuantity * price);
		setTTC(newQuantity * price + newQuantity * price * tauxTVA);
	};

	//handle the post request
	const handleSubmit = (e) => {
		e.preventDefault();
		// Create user data object
		const orderData = {
			id_book: id,
			id_customer: 12, //TODO : Find user id with authentication system
			quantity: quantity,
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
		<div>
			<h2>Formulaire de commande</h2>
			<div>
				<div>
					<table>
						<tbody>
							<tr>
								<td>Prix:</td>
								<td>{price} €</td>
							</tr>
							<tr>
								<td>Stock:</td>
								<td>{stock}</td>
							</tr>
							<tr>
								<td>Quantité:</td>
								<td>
									<label>
										<input
											type="number"
											placeholder="Quantité"
											value={quantity}
											onChange={(e) => handleQuantity(e)}
										/>
									</label>
								</td>
							</tr>
						</tbody>
					</table>
				</div>
				<div>
					<table>
						<tbody>
							<tr>
								<td>Taux de TVA:</td>
								<td>{tauxTVA}</td>
							</tr>
							<tr>
								<td>TVA:</td>
								<td>{TVA}</td>
							</tr>
							<tr>
								<td>HT:</td>
								<td>{HT}</td>
							</tr>
							<tr>
								<td>TTC:</td>
								<td>{TTC}</td>
							</tr>
						</tbody>
					</table>
				</div>
			</div>
			<div>
				<div>
					<input
						type="submit"
						value="Valider"
						onClick={handleSubmit}
					/>
				</div>
			</div>
			<Toaster /> {/* Toast container for displaying messages */}
		</div>
	);
}

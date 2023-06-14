import React, { useState } from 'react';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';

export default function Order({ book }) {
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
			"id_book": id,
			"id_customer": 12, //TODO : Find user id with authentication system
			"quantity": quantity,
		};
		// Send a POST request to create an order
		axios
			.post('https://apimysql-1-r1261081.deta.app/orders/', orderData, {
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
			<div className="mt-4">
				<p>Prix (unité) : {price}</p>
				<p>Stock : {stock}</p>
				<p>Taux de TVA : {tauxTVA}</p>
				<input
					type="number"
					className="form-control mb-2"
					placeholder="Quantité"
					value={quantity}
					onChange={(e) => { handleQuantity(e) }}
				/>
				<p>TVA: {TVA}</p>
				<p>HT: {HT}</p>
				<p>TTC: {TTC}</p>
				<input
					type="submit"
					className="btn btn-primary"
					value="Valider"
					onClick={handleSubmit}
				/>
			</div>
			<Toaster /> {/* Toast container for displaying messages */}
		</div>
	);
}

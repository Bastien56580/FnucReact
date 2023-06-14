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
	const [quantity, setQuantity] = useState('');
	const [TVA, setTVA] = useState('');
	const [HT, setHT] = useState('');
	const [TTC, setTTC] = useState('');

	const handleSubmit = (e) => {
		e.preventDefault();
		//here we need to do the post request when the back is ready to post our order,
		//in the meanwhile there is just an alert

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
		<div className="container">
            
			<div className="mt-4">
				<p>Prix (unité) : {price}</p>
				<p>Stock : {stock}</p>
				<p>Taux de TVA : {tauxTVA}</p>
				<input
					type="text"
					className="form-control mb-2"
					placeholder="Quantité"
					value={quantity}
					onChange={(e) => setQuantity(e.target.value)}
				/>
				<input
					type="text"
					className="form-control mb-2"
					placeholder="TVA"
					value={TVA}
					onChange={(e) => setTVA(e.target.value)}
				/>
				<input
					type="text"
					className="form-control mb-2"
					placeholder="HT"
					value={HT}
					onChange={(e) => setHT(e.target.value)}
				/>
				<input
					type="text"
					className="form-control mb-2"
					placeholder="TTC"
					value={TTC}
					onChange={(e) => setTTC(e.target.value)}
				/>
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

import { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import './UpdateClientFromAdmin.scss';

export default function UpdateClientFormAdmin() {
	const [firstName, setFirstName] = useState('');
	const [lastName, setLastName] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const baseUrl = sessionStorage.getItem('REACT_APP_BACK_URL');

	const { id } = useParams();

	useEffect(() => {
		axios
			.get(baseUrl + '/customers/' + id, {
				withCredentials: true,
			})
			.then((response) => {
				// Handle successful response
				setFirstName(response.data.firstname);
				setLastName(response.data.lastname);
				setEmail(response.data.email);
			})
			.catch((error) => {
				// Handle error response
				toast.error(error.response.data.detail); // Display error toast message with details
			});
	}, [id]);

	const handleSubmit = (e) => {
		e.preventDefault();
		// Create user data object
		const userData = {
			email: email,
			firstname: firstName,
			lastname: lastName,
			password: password,
		};

		// Send a POST request to create a user
		axios
			.patch(baseUrl + `/customers/${id}`, userData, {
				withCredentials: true,
			})
			.then((response) => {
				console.log(response);
				// Handle successful response
				if (response.status === 200) {
					toast.success('User updated!'); // Display success toast message
				} else {
					toast.error(response.data.detail); // Display error toast message with details
				}
			})
			.catch((error) => {
				// Handle error response
				toast.error(error.response.data.detail); // Display error toast message with details
			});
	};

	const handleCancel = (e) => {
		e.preventDefault();
		window.location.href = '/admin/clients';
	};

	return (
		<div className="formUpdateClient">
			<h2 className="formUpdateClient__title">Modifier un client</h2>
			<input
				type="text"
				placeholder="Prénom"
				value={firstName}
				onChange={(e) => setFirstName(e.target.value)}
			/>
			<input
				type="text"
				placeholder="Nom"
				value={lastName}
				onChange={(e) => setLastName(e.target.value)}
			/>
			<input
				type="email"
				placeholder="Email"
				value={email}
				onChange={(e) => setEmail(e.target.value)}
			/>
			<input
				type="password"
				placeholder="Mot de passe"
				value={password}
				onChange={(e) => setPassword(e.target.value)}
			/>
			<input type="submit" onClick={handleSubmit} value="Valider" />
			<input type="submit" onClick={handleCancel} value="Retour" />
			<Toaster /> {/* Toast container for displaying messages */}
		</div>
	);
}

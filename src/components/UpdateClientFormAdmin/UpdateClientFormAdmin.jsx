import React, { useState, useEffect } from 'react';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import { useParams } from 'react-router-dom';

export default function UpdateClientFormAdmin() {
	const [firstName, setFirstName] = useState('');
	const [lastName, setLastName] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	const { id } = useParams();

	useEffect(() => {
		// Axios request or fetch the book from the id info and setMyData
		// In the meantime, we are using the mock
		axios
			.get('https://apimysql-1-r1261081.deta.app/customers/' + id, {
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
			.patch(
				`https://apimysql-1-r1261081.deta.app/customers/${id}`,
				userData,
				{
					withCredentials: true,
				}
			)
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
		<div>
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
				placeholder="mail"
				value={email}
				onChange={(e) => setEmail(e.target.value)}
			/>
			<input
				type="password"
				placeholder="Mot de passe"
				value={password}
				onChange={(e) => setPassword(e.target.value)}
			/>

			<input type="submit" value="Valider" onClick={handleSubmit} />
			<input type="submit" value="Annuler" onClick={handleCancel} />
		</div>
	);
}
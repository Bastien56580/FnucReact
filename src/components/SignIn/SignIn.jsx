import { useState } from 'react';
import toast from 'react-hot-toast';
import axios from 'axios';
import './SignIn.scss';

export default function SignIn() {
	const [login, setLogin] = useState('');
	const [password, setPassword] = useState('');

	const baseUrl = sessionStorage.getItem('REACT_APP_BACK_URL');

	const handleSubmit = (e) => {
		e.preventDefault();

		// Create user data object
		const userData = {
			email: login,
			password: password,
		};

		// Send a POST request to log in a user
		axios
			.post(baseUrl + '/auth/login', userData, { withCredentials: true })
			.then((response) => {
				// Handle successful response
				if (response.data.token) {
					toast.success(response.data.message || response.data.detail); // Display success toast message
					sessionStorage.setItem('token', response.data.token);
					window.location.replace('/');
				} else {
					toast.error(response.data.message || response.data.detail); // Display error toast message with details
				}
			})
			.catch((error) => {
				// Handle error response
				toast.error(error.response.data.message || error.response.data.detail); // Display error toast message with details
			});
	};

	return (
		<div className="signIn">
			<h1 className="signIn__title">Connexion</h1>
			<input
				type="email"
				placeholder="Email"
				value={login}
				onChange={(e) => setLogin(e.target.value)}
			/>

			<input
				type="password"
				placeholder="Mot de passe"
				value={password}
				onChange={(e) => setPassword(e.target.value)}
			/>
			<input type="submit" onClick={handleSubmit} value="Se connecter" />
		</div>
	);
}

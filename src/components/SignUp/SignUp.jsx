import { useState } from 'react';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import './SignUp.scss';

/**
 * Formulaire d'inscription
 */
export default function SignUp() {
	// State variables for form inputs
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');
	const [firstname, setFirstname] = useState('');
	const [lastname, setLastName] = useState('');

	const baseUrl = sessionStorage.getItem('REACT_APP_BACK_URL');

	const handleSubmit = (e) => {
		e.preventDefault();

		// Create user data object
		const userData = {
			email: email,
			firstname: firstname,
			lastname: lastname,
			password: password,
			password_confirmation: confirmPassword,
		};

		// Send a POST request to create a user
		axios
			.post(baseUrl + '/auth/register', userData, {
				withCredentials: true,
			})
			.then((response) => {
				// Handle successful response
				if (response.data.token) {
					toast.success(
						response.data.message || response.data.detail
					); // Display success toast message
					sessionStorage.setItem('token', response.data.token);
					window.location.replace('/');
				} else {
					toast.error(response.data.message || response.data.detail); // Display error toast message with details
				}
			})
			.catch((error) => {
				// Handle error response
				toast.error(
					error.response.data.message || error.response.data.detail
				); // Display error toast message with details
			});
	};

	return (
		<div className="signUp">
			<h1 className="signUp__title">Inscription</h1>
			<input
				type="firstname"
				placeholder="Prenom"
				value={firstname}
				onChange={(e) => setFirstname(e.target.value)}
			/>
			<input
				type="lastname"
				placeholder="Nom de Famille"
				value={lastname}
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
			<input
				type="password"
				placeholder="Confimez le mot de passe"
				value={confirmPassword}
				onChange={(e) => setConfirmPassword(e.target.value)}
			/>
			<input
				type="submit"
				onClick={handleSubmit}
				value="Créer un compte"
			/>
			<Toaster /> {/* Toast container for displaying messages */}
		</div>
	);
}

import { useState } from 'react';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import jwt_decode from 'jwt-decode';

export default function SignUp() {
	// State variables for form inputs
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [firstname, setFirstname] = useState('');
	const [lastname, setLastName] = useState('');
	const [password_confirmation, setpassword_confirmation] = useState('');
	const baseUrl = sessionStorage.getItem('REACT_APP_BACK_URL');

	const handleSubmit = (e) => {
		e.preventDefault();

		// Create user data object
		const userData = {
			email: email,
			firstname: firstname,
			lastname: lastname,
			password: password,
			password_confirmation: password_confirmation,
		};

		// Send a POST request to create a user
		axios
			.post(baseUrl + '/customers/', userData, { withCredentials: true })
			.then((response) => {
				// Handle successful response
				if (response.data.token) {
					toast.success('User created!'); // Display success toast message
					sessionStorage.setItem('token', response.data.token);

					window.location.replace('/');
				} else {
					toast.error(response.data.detail); // Display error toast message with details
				}
			})
			.catch((error) => {
				// Handle error response

				console.log(error);
				toast.error(error.response.data.detail); // Display error toast message with details
			});
	};

	return (
		<div
			className="d-flex mt-5 justify-content-center"
			style={{ height: '100vh' }}
		>
			<div className="text-center w-25">
				<input
					type="firstname"
					className="form-control mb-3"
					placeholder="Prenom"
					value={firstname}
					onChange={(e) => setFirstname(e.target.value)}
				/>
				<input
					type="lastname"
					className="form-control mb-3"
					placeholder="Nom de Famille"
					value={lastname}
					onChange={(e) => setLastName(e.target.value)}
				/>
				<input
					type="email"
					className="form-control mb-3"
					placeholder="Email"
					value={email}
					onChange={(e) => setEmail(e.target.value)}
				/>
				<input
					type="password"
					className="form-control mb-3"
					placeholder="Mot de passe"
					value={password}
					onChange={(e) => setPassword(e.target.value)}
				/>
				<input
					type="password"
					className="form-control mb-3"
					placeholder="Confirmez votre mot de passe"
					value={password_confirmation}
					onChange={(e) => setpassword_confirmation(e.target.value)}
				/>
				<button
					type="submit"
					className="btn btn-success"
					onClick={handleSubmit}
				>
					Créer un compte
				</button>
			</div>
			<Toaster /> {/* Toast container for displaying messages */}
		</div>
	);
}

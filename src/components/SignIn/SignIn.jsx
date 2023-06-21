import { useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import axios from 'axios';

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
		<div
			className="d-flex mt-5 justify-content-center"
			style={{ height: '100vh' }}
		>
			<form className="text-center">
				<div className="mb-3">
					<input
						type="email"
						className="form-control"
						placeholder="Email"
						value={login}
						onChange={(e) => setLogin(e.target.value)}
					/>
				</div>
				<div className="mb-3">
					<input
						type="password"
						className="form-control"
						placeholder="Mot de passe"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
					/>
				</div>
				<button
					type="submit"
					className="btn btn-success"
					onClick={handleSubmit}
				>
					Valider
				</button>
			</form>
      <Toaster/>
		</div>
	);
}

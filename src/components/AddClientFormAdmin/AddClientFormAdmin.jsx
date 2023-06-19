import { useState } from 'react';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';

export default function AddClientFormAdmin() {
	const [firstName, setFirstName] = useState('');
	const [lastName, setLastName] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const baseUrl = sessionStorage.getItem('REACT_APP_BACK_URL');

	const handleCancel = (e) => {
		e.preventDefault();
		window.location.href = '/admin/clients';
	};

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
			.post(baseUrl + '/customers/', userData, {
				withCredentials: true,
			})
			.then((response) => {
				// Handle successful response
				if (response.status === 201) {
					toast.success('User created!'); // Display success toast message
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
			<div>
				<div>
					<h2>Ajouter un client</h2>
					<form>
						<div>
							<input
								type="text"
								placeholder="Prénom"
								value={firstName}
								onChange={(e) => setFirstName(e.target.value)}
							/>
						</div>
						<div>
							<input
								type="text"
								placeholder="Nom"
								value={lastName}
								onChange={(e) => setLastName(e.target.value)}
							/>
						</div>
						<div>
							<input
								type="email"
								placeholder="Mail"
								value={email}
								onChange={(e) => setEmail(e.target.value)}
							/>
						</div>
						<div>
							<input
								type="password"
								placeholder="Mot de passe"
								value={password}
								onChange={(e) => setPassword(e.target.value)}
							/>
						</div>
						<button onClick={handleSubmit}>Valider</button>
						<button onClick={handleCancel}>Retour</button>
					</form>
					<Toaster /> {/* Toast container for displaying messages */}
				</div>
			</div>
		</div>
	);
}

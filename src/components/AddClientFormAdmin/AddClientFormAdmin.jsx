import { useState } from 'react';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import '../../css/style.css'
export default function AddClientFormAdmin() {
	const [firstName, setFirstName] = useState('');
	const [lastName, setLastName] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const baseUrl = sessionStorage.getItem("REACT_APP_BACK_URL");


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

		let token = sessionStorage.getItem("token");
		// Send a POST request to create a user
		axios
			.post(baseUrl + '/customers/', userData, {
				withCredentials: true,
				headers: {
					Authorization: `Bearer ${token}`,
				},
			})
			.then((response) => {
				// Handle successful response
				if (response.status === 201) {
					toast.success('User created!'); // Display success toast message
				} else {
					toast.error(response.data.detail || response.data.message); // Display error toast message with details
				}
			})
			.catch((error) => {
				// Handle error response
				toast.error(error.response.data.detail || error.response.data.message); // Display error toast message with details
			});
	};

	return (
		<div className="container">
			<div className="row">
				<div className="col-md-6">
					<h2 className="pt-5 pb-2">Ajouter un client</h2>
					<form>
						<div className="mb-3">
							<input
								type="text"
								className="form-control"
								placeholder="Prénom"
								value={firstName}
								onChange={(e) => setFirstName(e.target.value)}
							/>
						</div>
						<div className="mb-3">
							<input
								type="text"
								className="form-control"
								placeholder="Nom"
								value={lastName}
								onChange={(e) => setLastName(e.target.value)}
							/>
						</div>
						<div className="mb-3">
							<input
								type="email"
								className="form-control"
								placeholder="Mail"
								value={email}
								onChange={(e) => setEmail(e.target.value)}
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
						<button className="btn btn-custom-primary me-2" onClick={handleSubmit}>
							Valider
						</button>
						<button className="btn btn-custom-primary me-2" onClick={handleCancel}>
							Retour
						</button>
					</form>
					<Toaster /> {/* Toast container for displaying messages */}
				</div>
			</div>
		</div>

	);
}

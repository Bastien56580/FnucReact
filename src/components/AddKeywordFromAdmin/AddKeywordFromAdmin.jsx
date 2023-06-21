import { useState } from 'react';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import './AddKeywordFromAdmin.scss';

export default function AddKeywordFormAdmin() {
	const [keyword, setKeyword] = useState('');
	const baseUrl = sessionStorage.getItem('REACT_APP_BACK_URL');

	const handleCancel = (e) => {
		e.preventDefault();
		window.location.href = '/admin/indexes';
	};

	const handleSubmit = (e) => {
		e.preventDefault();

		// Send a POST request to create a user
		if (keyword) {
			let token = sessionStorage.getItem("token")
			axios
				.post(baseUrl + '/keywords/', { 'label': keyword }, {
					withCredentials: true,
					headers: {
						Authorization: `Bearer ${token}`,
					},
				})
				.then((response) => {
					// Handle successful response
					if (response.status === 200) {
						toast.success('Keyword created!'); // Display success toast message
					} else {
						toast.error(response.data.detail || response.data.message); // Display error toast message with details
					}
				})
				.catch((error) => {
					// Handle error response
					toast.error(error.response.data.detail || error.response.data.message); // Display error toast message with details
				});
		} else {
			toast.error('Veuillez remplire le champ');
		}
	};

	return (
		<div className="formAddKeyword">
			<h2 className="formAddKeyword__title">Ajouter un mot clé</h2>
			<input
				type="text"
				placeholder="Mot Clé"
				value={keyword}
				onChange={(e) => setKeyword(e.target.value)}
			/>
			<input type="submit" onClick={handleSubmit} value="Valider" />
			<input type="submit" onClick={handleCancel} value="Retour" />
			<Toaster /> {/* Toast container for displaying messages */}
		</div>
	);
}

import { useState } from 'react';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import '../../css/style.css';

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
			axios
				.post(
					baseUrl + '/keywords/',
					{ label: keyword },
					{
						withCredentials: true,
					}
				)
				.then((response) => {
					// Handle successful response
					if (response.status === 200) {
						toast.success('Keyword created!'); // Display success toast message
					} else {
						toast.error(response.data.detail); // Display error toast message with details
					}
				})
				.catch((error) => {
					// Handle error response
					toast.error(error.response.data.detail); // Display error toast message with details
				});
		} else {
			toast.error('Veuillez remplire le champ');
		}
	};

	return (
		<div>
			<div>
				<div>
					<h2>Ajouter un mot clé</h2>
					<form>
						<div>
							<input
								type="text"
								placeholder="Mot Clé"
								value={keyword}
								onChange={(e) => setKeyword(e.target.value)}
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

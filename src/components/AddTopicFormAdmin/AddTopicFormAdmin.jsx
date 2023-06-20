import { useState } from 'react';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import './AddTopicFormAdmin.scss';

export default function AddBookFormAdmin() {
	const baseUrl = sessionStorage.getItem('REACT_APP_BACK_URL');
	const [topic, setTopic] = useState('');
	const [topicUrl, setTopicUrl] = useState('');

	const handleCancel = (e) => {
		e.preventDefault();
		window.location.href = '/admin/indexes';
	};
	const handleSubmit = (e) => {
		e.preventDefault();
		// Create user data object
		const topicData = {
			label: topic,
			topicUrl: topicUrl,
		};

		// Send a POST request to create a user
		axios
			.post(baseUrl + '/topics/', topicData, {
				withCredentials: true,
			})
			.then((response) => {
				// Handle successful response
				if (response.status === 200) {
					toast.success('Topic created!'); // Display success toast message
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
		<div className="formAddTopic">
			<h2 className="formAddTopic__title">Ajouter un rayon</h2>
			<input
				type="text"
				placeholder="Titre"
				value={topic}
				onChange={(e) => setTopic(e.target.value)}
			/>
			<input
				type="text"
				placeholder="Url de la couverture"
				value={topicUrl}
				onChange={(e) => setTopicUrl(e.target.value)}
			/>
			<input type="submit" value="Valider" onClick={handleSubmit} />
			<input type="submit" value="Retour" onClick={handleCancel} />
			<Toaster /> {/* Toast container for displaying messages */}
		</div>
	);
}

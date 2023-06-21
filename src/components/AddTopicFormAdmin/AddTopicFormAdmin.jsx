import { useState } from 'react';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';

export default function AddBookFormAdmin() {
	const baseUrl = sessionStorage.getItem("REACT_APP_BACK_URL");
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

		let token = sessionStorage.getItem("token");

		// Send a POST request to create a user
		axios
			.post(baseUrl + '/topics/', topicData, {
				withCredentials: true,
				headers: {
					Authorization: `Bearer ${token}`,
				},
			})
			.then((response) => {
				// Handle successful response
				if (response.status === 200) {
					toast.success('Topic created!'); // Display success toast message
				} else {
					toast.error(response.data.detail || response.data.message); // Display error toast message with details
				}
			})
			.catch((error) => {
				// Handle error response
				toast.error(error.response.data.detail ||error.response.data.message); // Display error toast message with details
			});
	};

	return (
		<div className="container">
			<div className="row">
				<div className="col-md-6">
					<h2 className="pt-5 pb-2">Ajouter un rayon</h2>
					<form>
						<div className="mb-3">
							<input
								type="text"
								className="form-control"
								placeholder="Titre"
								value={topic}
								onChange={(e) => setTopic(e.target.value)}
							/>
						</div>
						<div className="mb-3">
							<input
								type="text"
								className="form-control"
								placeholder="Url de la couverture"
								value={topicUrl}
								onChange={(e) => setTopicUrl(e.target.value)}
							/>
						</div>
						<button className="btn btn-primary" onClick={handleSubmit}>
							Valider
						</button>
						<button className="btn btn-secondary" onClick={handleCancel}>
							Retour
						</button>
					</form>
					<Toaster /> {/* Toast container for displaying messages */}
				</div>
			</div>
		</div>
	);
}

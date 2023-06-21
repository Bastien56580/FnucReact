import { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';

export default function UpdateTopicFormAdmin() {
	const [topic, setTopic] = useState('');
	const [topicUrl, setTopicUrl] = useState('');

	const baseUrl = sessionStorage.getItem("REACT_APP_BACK_URL");
	const { id } = useParams();

	useEffect(() => {
		axios
			.get(baseUrl + '/topics/' + id, {
				withCredentials: true,
			})
			.then((response) => {
				// Handle successful response
				setTopic(response.data.label);
				setTopicUrl(response.data.topic_url);
			})
			.catch((error) => {
				// Handle error response
				toast.error(error.response.data.detail); // Display error toast message with details
			});
	}, [id]);

	const handleSubmit = (e) => {
		e.preventDefault();
		// Create user data object
		const topicData = {
			label: topic,
			topic_url: topicUrl,
		};

		let token = sessionStorage.getItem("token")

		// Send a POST request to create a user
		axios
			.patch(
				baseUrl + `/topics/${id}`,
				topicData,
				{
					withCredentials: true,
					headers: {
						Authorization: `Bearer ${token}`,
					},
				}
			)
			.then((response) => {
				console.log(response);
				// Handle successful response
				if (response.status === 200) {
					toast.success('Topic updated!'); // Display success toast message
				} else {
					toast.error(response.data.detail || response.data.message); // Display error toast message with details
				}
			})
			.catch((error) => {
				// Handle error response
				toast.error(error.response.data.detail || error.response.data.message); // Display error toast message with details
			});
	};

	const handleCancel = (e) => {
		e.preventDefault();
		window.location.href = '/admin/indexes';
	};

	return (
		<div className="container">
			<div className="row">
				<div className="col-md-6">
					<h2 className="pt-5 pb-2">Modifier un rayon</h2>
					<form>
						<div className="mb-3">
							<input
								type="text"
								className="form-control"
								placeholder="Rayon"
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

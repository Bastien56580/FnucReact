import { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import './UpdateTopicFormAdmin.scss';

export default function UpdateTopicFormAdmin() {
	const [topic, setTopic] = useState('');
	const [topicUrl, setTopicUrl] = useState('');

	const baseUrl = sessionStorage.getItem('REACT_APP_BACK_URL');
	const { id } = useParams();

	useEffect(() => {
		axios
			.get(baseUrl + '/topics/' + id, {
				withCredentials: true,
			})
			.then((response) => {
				// Handle successful response
				setTopic(response.data.label);
				setTopicUrl(response.data.image);
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
			image: topicUrl,
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
		<div className="formUpdateTopic">
			<h2 className="formUpdateTopic__title">Modifier un rayon</h2>
			<input
				type="text"
				placeholder="Rayon"
				value={topic}
				onChange={(e) => setTopic(e.target.value)}
			/>
			<input
				type="text"
				placeholder="Url de la couverture"
				value={topicUrl}
				onChange={(e) => setTopicUrl(e.target.value)}
			/>
			<input type="submit" onClick={handleSubmit} value="Valider" />
			<input type="submit" value="Retour" onClick={handleCancel} />
			<Toaster /> {/* Toast container for displaying messages */}
		</div>
	);
}

import { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';

export default function UpdateKeywordFormAdmin() {
	const [keyword, setKeyword] = useState('');
	const { id } = useParams();
	const baseUrl = sessionStorage.getItem("REACT_APP_BACK_URL");

	useEffect(() => {
		axios
			.get(baseUrl + '/keywords/' + id, {
				withCredentials: true,
			})
			.then((response) => {
				// Handle successful response
				setKeyword(response.data.label);
			})
			.catch((error) => {
				// Handle error response
				toast.error(error.response.data.detail); // Display error toast message with details
			});
	}, [id]);

	const handleSubmit = (e) => {
		e.preventDefault();

		// Send a POST request to create a user
		axios
			.patch(
				baseUrl + `/keywords/${id}`,
				{ 'label': keyword },
				{
					withCredentials: true,
				}
			)
			.then((response) => {
				console.log(response);
				// Handle successful response
				if (response.status === 200) {
					toast.success('Keyword updated!'); // Display success toast message
				} else {
					toast.error(response.data.detail); // Display error toast message with details
				}
			})
			.catch((error) => {
				// Handle error response
				toast.error(error.response.data.detail); // Display error toast message with details
			});
	};

	const handleCancel = (e) => {
		e.preventDefault();
		window.location.href = '/admin/keywords';
	};

	return (
		<div className="container">
			<div className="row">
				<div className="col-md-6">
					<h2 className="pt-5 pb-2">Modifier un mot clé</h2>
					<form>
						<div className="mb-3">
							<input
								type="text"
								className="form-control"
								placeholder="Mot clé"
								value={keyword}
								onChange={(e) => setKeyword(e.target.value)}
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

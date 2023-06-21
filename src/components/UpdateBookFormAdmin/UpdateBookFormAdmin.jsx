import { useState, useEffect } from 'react';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import { useParams } from 'react-router-dom';
import '../../css/style.css'

export default function UpdateBookFormAdmin() {
	const baseUrl = sessionStorage.getItem("REACT_APP_BACK_URL");
	const [title, setTitle] = useState('');
	const [author, setAuthor] = useState('');
	const [resume, setResume] = useState('');
	const [coverUrl, setCoverUrl] = useState('');
	const [price, setPrice] = useState(0);
	const [stock, setStock] = useState(0);

	const [motCle, setMotCle] = useState('');
	const [topic, setTopic] = useState('');

	const [keywordList, setKeywordList] = useState('');
	const [topicList, setTopicList] = useState('');

	const { bookId } = useParams();

	useEffect(() => {
		
		axios
			.get(baseUrl + '/books/' + bookId, {
				withCredentials: true,
				
			})
			.then((response) => {
				// Handle successful response
				setTitle(response.data.title);
				setAuthor(response.data.author);
				setResume(response.data.resume);
				setCoverUrl(response.data.image);
				setPrice(response.data.price);
				setStock(response.data.stock);
			})
			.catch((error) => {
				// Handle error response
				toast.error(error.response.data.message || error.response.data.detail); // Display error toast message with details
			});
	}, [bookId]);

	const handleSubmit = async (e) => {
		e.preventDefault();
		// Create user data object
		const userData = {
			title: title,
			author: author,
			resume: resume,
			image: coverUrl,
			price: price,
			stock: stock,
		};


		// Send a POST request to create a user
		const token = sessionStorage.getItem('token');
		await axios
			.patch(
				baseUrl + `/books/${bookId}`,
				userData,
				{
					withCredentials: true,
					headers: {
						Authorization: `Bearer ${token}`,
					},
				}
			)
			.then((response) => {
				// Handle successful response
				if (response.status === 200) {
					toast.success('Book updated!'); // Display success toast message
				} else {
					toast.error(response.data.message || response.data.detail); // Display error toast message with details
				}
			})
			.catch((error) => {
				// Handle error response
				toast.error(error.response.data.message || error.response.data.detail); // Display error toast message with details
			});

		//axios get to get the list of topics and their id
		if (motCle != '') {
			console.log("motCle is not empty")
			//we need, so we get all keywords
			await axios
				.get(baseUrl + '/keywords/', {
					withCredentials: true,
					headers: {
						Authorization: `Bearer ${token}`,
					},
				})
				.then((response) => {
					// Handle successful response
					//setting the keywords list
					setKeywordList(response.data);
					console.log("here is keywordList : ");
					console.log(keywordList);
				})
				.catch((error) => {
					// Handle error response
					toast.error(error.response.data.detail); // Display error toast message with details
				});
			//then we check if what is the id for this topic
			const matchingKeyword = keywordList.find(keyword => keyword.label === motCle);
			console.log("matchingKeyword ? : " + matchingKeyword);
			if (matchingKeyword) {
				const motCleId = matchingKeyword.id;
				//then we post the relation book - topic
				await axios
					.post(baseUrl + '/books/' + bookId + '/keywords/' + motCleId, {
						withCredentials: true,
					headers: {
						Authorization: `Bearer ${token}`,
					},
					})
					.then((response) => {
						// Handle successful response
						if (response.status === 201) {
							setBookId(response.data.id);
							toast.success('Keyword added!'); // Display success toast message
						} else {
							toast.error(response.data.detail); // Display error toast message with details
						}
					})
					.catch((error) => {
						// Handle error response
						toast.error(error.response.data.detail); // Display error toast message with details
					});
			}
		}

		//and now do the same for topic
		//we check if we need to work with motCle
		if (topic != '') {
			//we need, so we get all keywords
			await axios
				.get(baseUrl + '/topics/', {
					withCredentials: true,
					headers: {
						Authorization: `Bearer ${token}`,
					},
				})
				.then((response) => {
					// Handle successful response
					//setting the keywords list
					setTopicList(response.data);
				})
				.catch((error) => {
					// Handle error response
					toast.error(error.response.data.detail); // Display error toast message with details
				});
			//then we check if what is the id for this topic
			const matchingTopic = topicList.find(topic => topic.labels === topic);
			if (matchingTopic) {
				const topiId = matchingTopic.id;
				//then we post the relation book - topic
				await axios
					.post(baseUrl + '/books/' + bookId + '/topics/' + topiId, {
						withCredentials: true,
					headers: {
						Authorization: `Bearer ${token}`,
					},
					})
					.then((response) => {
						// Handle successful response
						if (response.status === 201) {
							setBookId(response.data.id);
							toast.success('Topic added!'); // Display success toast message
						} else {
							toast.error(response.data.detail); // Display error toast message with details
						}
					})
					.catch((error) => {
						// Handle error response
						toast.error(error.response.data.detail); // Display error toast message with details
					});
			}

		}
	};

	const handleCancel = (e) => {
		e.preventDefault();
		window.location.href = '/admin/books';
	};

	return (
		<div className="container">
			<div className="row">
				<div className="col-md-6">
					<h2 className="pt-5 pb-2">Editer un livre</h2>
					<form>
						<div className="mb-3">
							<input
								type="text"
								className="form-control"
								placeholder="Titre"
								value={title}
								onChange={(e) => setTitle(e.target.value)}
							/>
						</div>
						<div className="mb-3">
							<input
								type="text"
								className="form-control"
								placeholder="Auteur"
								value={author}
								onChange={(e) => setAuthor(e.target.value)}
							/>
						</div>
						<div className="mb-3">
							<input
								type="text"
								className="form-control"
								placeholder="Résumé"
								value={resume}
								onChange={(e) => setResume(e.target.value)}
							/>
						</div>
						<div className="mb-3">
							<input
								type="text"
								className="form-control"
								placeholder="Url de la couverture"
								value={coverUrl}
								onChange={(e) => setCoverUrl(e.target.value)}
							/>
						</div>
						<div className="mb-3">
							<input
								type="text"
								className="form-control"
								placeholder="Prix"
								value={price}
								onChange={(e) => setPrice(e.target.value)}
							/>
						</div>
						<div className="mb-3">
							<input
								type="text"
								className="form-control"
								placeholder="Stock"
								value={stock}
								onChange={(e) => setStock(e.target.value)}
							/>
						</div>
						<div className="mb-3">
							<input
								type="text"
								className="form-control"
								placeholder="Ajouter un topic"
								value={topic}
								onChange={(e) => setTopic(e.target.value)}
							/>
						</div>
						<div className="mb-3">
							<input
								type="text"
								className="form-control"
								placeholder="Ajouter un mot clé"
								value={motCle}
								onChange={(e) => setMotCle(e.target.value)}
							/>
						</div>
						<button className="btn btn-custom-primary me-2" onClick={handleSubmit}>
							Valider
						</button>
						<button className="btn btn-custom-primary me-2" onClick={handleCancel}>
							Retour
						</button>
					</form>
				</div>
			</div>
		</div>
	)
}

import { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import jwt_decode from "jwt-decode";
import './Navbar.scss';
import axios from "axios";
import toast, { Toaster } from 'react-hot-toast';




/**
 * Barre de navigation
 */
export default function Navbar() {

	// State variables
	const [isLoggedIn,setIsLoggedIn] = useState(false); // State variable for tracking user login status
	const [isAdmin,setIsAdmin] = useState(false); // State variable for tracking user admin status
	const baseUrl = sessionStorage.getItem('REACT_APP_BACK_URL');

	useEffect(() => {
		if(sessionStorage.getItem("token")){
			setIsLoggedIn(true);

			let decoded_token = jwt_decode(sessionStorage.getItem("token"));
			if(decoded_token.role==="admin"){
				setIsAdmin(true)
			}
		}
	}, [sessionStorage.getItem("token")]);


	const HandleDisconnect=()=>{

		let token = sessionStorage.getItem("token");
		// Send a POST request to create a user
		axios
			.post(baseUrl + '/auth/logout/', {
				withCredentials: true,
				headers: {
					Authorization: `Bearer ${token}`,
				},
			})
			.then((response) => {
				// Handle successful response
				if (response.status === 200) {
					toast.success('Logout successful!'); // Display success toast message
				} else {
					toast.error(response.data.detail || response.data.message); // Display error toast message with details
				}
			})
			.catch((error) => {
				// Handle error response
				toast.error(error.response.data.detail || error.response.data.message); // Display error toast message with details
			});
		sessionStorage.removeItem("token");


		window.location.reload("/");
	}

	return (
		<nav className="navbar">
			<div className="navbar__logo">
				<a href="/">
					<img
						src="/fnuc.png"
						alt="Fnuc"
						className="navbar__logo--image"
					/>
				</a>
			</div>
			<div className="navbar__menu">
				<a href="/" className="navbar__menu--link">
					Accueil
				</a>
				{isLoggedIn && (<a href="/profile" className="navbar__menu--link">
					Profil
				</a>)}
				{isAdmin && (<a href="/admin" className="navbar__menu--link">
					Administration
				</a>)}
				{isAdmin && (<a href="/admin/parameter" className="navbar__menu--link">
					Paramètres
				</a>)}
				<a href="/search" className="navbar__menu--link">
					Recherche
				</a>
			</div>
			<div className="navbar__login">
			{!isLoggedIn && (<a href="/signin" className="navbar__login--link">
					Connexion
				</a>)}
				{!isLoggedIn && (<a href="/signup" className="navbar__login--link">
					Inscription
				</a>)}
				{isLoggedIn && (
				<a onClick={HandleDisconnect} className="navbar__login--link">
					Déconnexion
				</a>)}
			</div>
			<Toaster/>
		</nav>
		// <nav className="navbar navbar-expand-lg navbar-light couleur-4">
		// 	<a className="navbar-brand" href="/">
		// 		{' '}
		// 		{/* Add mx-auto class */}
		// 		<img
		// 			src="/fnuc.png"
		// 			className="navbar-link m-5 mb-0 mt-0"
		// 			style={{ width: '15%', height: '15%' }}
		// 			alt="Fnuc"
		// 		/>
		// 	</a>
		// 	<button
		// 		className="navbar-toggler me-auto"
		// 		type="button"
		// 		data-bs-toggle="collapse"
		// 		data-bs-target="#navbarToggler"
		// 		aria-controls="navbarToggler"
		// 		aria-expanded="false"
		// 		aria-label="Toggle navigation"
		// 	>
		// 		<span className="navbar-toggler-icon"></span>
		// 	</button>

		// 	<div
		// 		className="collapse navbar-collapse justify-content-between align-items-center"
		// 		id="navbarToggler"
		// 	>
		// 		<ul className="navbar-nav ms-3 mb-2 justify-content-center mx-auto">
		// 			{' '}
		// 			{/* Add mx-auto class */}
		// 			<li
		// 				className={`nav-item ${
		// 					activePage === '/'
		// 						? 'text-decoration-underline'
		// 						: ''
		// 				}`}
		// 			>
		// 				<a className="nav-link text-white fw-bold" href="/">
		// 					Accueil
		// 				</a>
		// 			</li>
		// 			{/* Display the 'Profil' link if the user is logged in */}
		// 			{isLoggedIn && (
		// 				<li
		// 					className={`nav-item ${
		// 						activePage === '/profile'
		// 							? 'text-decoration-underline'
		// 							: ''
		// 					}`}
		// 				>
		// 					<a
		// 						className="nav-link text-white fw-bold"
		// 						href="/profile"
		// 					>
		// 						Profil
		// 					</a>
		// 				</li>
		// 			)}
		// 			{/* Display the 'Administration' link if the user is an admin */}
		// 			{isAdmin && (
		// 				<li
		// 					className={`nav-item ${
		// 						activePage === '/admin'
		// 							? 'text-decoration-underline'
		// 							: ''
		// 					}`}
		// 				>
		// 					<a
		// 						className="nav-link text-white fw-bold"
		// 						href="/admin"
		// 					>
		// 						Administration
		// 					</a>
		// 				</li>
		// 			)}
		// 			{isAdmin && (
		// 				<li
		// 					className={`nav-item ${
		// 						activePage === '/admin/parameter'
		// 							? 'text-decoration-underline'
		// 							: ''
		// 					}`}
		// 				>
		// 					<a
		// 						className="nav-link text-white fw-bold"
		// 						href="/admin/parameter"
		// 					>
		// 						Paramètres
		// 					</a>
		// 				</li>
		// 			)}
		// 			<li
		// 				className={`nav-item ${
		// 					activePage === '/search'
		// 						? 'text-decoration-underline'
		// 						: ''
		// 				}`}
		// 			>
		// 				<a
		// 					className="nav-link text-white fw-bold"
		// 					href="/search"
		// 				>
		// 					Recherche
		// 				</a>
		// 			</li>
		// 		</ul>
		// 		{/* Display the 'Déconnexion' button if the user is logged in */}
		// 		<ul className="navbar-nav">
		// 			{/* Display the 'Connexion' and 'S'enregistrer' links if the user is not logged in */}
		// 			{!isLoggedIn && (
		// 				<li
		// 					className={`nav-item ${
		// 						activePage === '/signin'
		// 							? 'text-decoration-underline'
		// 							: ''
		// 					}`}
		// 				>
		// 					<a
		// 						className="nav-link text-white fw-bold"
		// 						href="/signin"
		// 					>
		// 						Connexion
		// 					</a>
		// 				</li>
		// 			)}
		// 			{!isLoggedIn && (
		// 				<li
		// 					className={`nav-item ${
		// 						activePage === '/signup'
		// 							? 'text-decoration-underline'
		// 							: ''
		// 					}`}
		// 				>
		// 					<a
		// 						className="nav-link text-white fw-bold"
		// 						href="/signup"
		// 					>
		// 						{"S'enregistrer"}
		// 					</a>
		// 				</li>
		// 			)}
		// 			{isLoggedIn && (
		// 				<li className="nav-item">
		// 					<a
		// 						className="btn btn-danger mr-5"
		// 						href="/disconnect"
		// 					>
		// 						Déconnexion
		// 					</a>
		// 				</li>
		// 			)}
		// 		</ul>
		// 	</div>
		// </nav>
	);
}

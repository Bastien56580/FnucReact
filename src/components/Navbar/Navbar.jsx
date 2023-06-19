import { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import jwt_decode from "jwt-decode";


// Component for the navigation bar
export default function Navbar() {
	// Get the active page URL
	const activePage = window.location.pathname;

	// State variables
	const [isLoggedIn,setIsLoggedIn] = useState(false); // State variable for tracking user login status
	const [isAdmin,setIsAdmin] = useState(false); // State variable for tracking user admin status

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
		sessionStorage.removeItem("token");
		window.location.reload("/");
	}

	return (
		<div>
			<nav className="navbar navbar-expand-lg navbar-light couleur-4">
				<a className="navbar-brand" href="/">
					{' '}
					{/* Add mx-auto class */}
					<img
						src="/fnuc.png"
						className="navbar-link m-5 mb-0 mt-0"
						style={{ width: '15%', height: '15%' }}
						alt="Fnuc"
					/>
				</a>
				<button
					className="navbar-toggler me-auto"
					type="button"
					data-bs-toggle="collapse"
					data-bs-target="#navbarToggler"
					aria-controls="navbarToggler"
					aria-expanded="false"
					aria-label="Toggle navigation"
				>
					<span className="navbar-toggler-icon"></span>
				</button>

				<div
					className="collapse navbar-collapse justify-content-between align-items-center"
					id="navbarToggler"
				>
					<ul className="navbar-nav ms-3 mb-2 justify-content-center mx-auto">
						{' '}
						{/* Add mx-auto class */}
						<li
							className={`nav-item ${
								activePage === '/'
									? 'text-decoration-underline'
									: ''
							}`}
						>
							<a className="nav-link text-white fw-bold" href="/">
								Accueil
							</a>
						</li>
						{/* Display the 'Profil' link if the user is logged in */}
						{isLoggedIn && (
							<li
								className={`nav-item ${
									activePage === '/profile'
										? 'text-decoration-underline'
										: ''
								}`}
							>
								<a
									className="nav-link text-white fw-bold"
									href="/profile"
								>
									Profil
								</a>
							</li>
						)}
						{/* Display the 'Administration' link if the user is an admin */}
						{isAdmin && (
							<li
								className={`nav-item ${
									activePage === '/admin'
										? 'text-decoration-underline'
										: ''
								}`}
							>
								<a
									className="nav-link text-white fw-bold"
									href="/admin"
								>
									Administration
								</a>
							</li>
						)}
						{isAdmin && (
							<li
								className={`nav-item ${
									activePage === '/admin/parameter'
										? 'text-decoration-underline'
										: ''
								}`}
							>
								<a
									className="nav-link text-white fw-bold"
									href="/admin/parameter"
								>
									Paramètres
								</a>
							</li>
						)}
						<li
							className={`nav-item ${
								activePage === '/search'
									? 'text-decoration-underline'
									: ''
							}`}
						>
							<a
								className="nav-link text-white fw-bold"
								href="/search"
							>
								Recherche
							</a>
						</li>
					</ul>
					{/* Display the 'Déconnexion' button if the user is logged in */}
					<ul className="navbar-nav">
						{/* Display the 'Connexion' and 'S'enregistrer' links if the user is not logged in */}
						{!isLoggedIn && (
							<li
								className={`nav-item ${
									activePage === '/signin'
										? 'text-decoration-underline'
										: ''
								}`}
							>
								<a
									className="nav-link text-white fw-bold"
									href="/signin"
								>
									Connexion
								</a>
							</li>
						)}
						{!isLoggedIn && (
							<li
								className={`nav-item ${
									activePage === '/signup'
										? 'text-decoration-underline'
										: ''
								}`}
							>
								<a
									className="nav-link text-white fw-bold"
									href="/signup"
								>
									{"S'enregistrer"}
								</a>
							</li>
						)}
						{isLoggedIn && (
							<li className="nav-item">
								<a
									className="btn btn-danger mr-5"
									onClick={HandleDisconnect}
								>
									Déconnexion
								</a>
							</li>
						)}
					</ul>
				</div>
			</nav>
		</div>
	);
}

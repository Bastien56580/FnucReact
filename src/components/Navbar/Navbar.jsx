import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

// Component for the navigation bar
export default function Navbar() {
  // Get the active page URL
  const activePage = window.location.pathname;

  // State variables
  const [isLoggedIn, setIsLoggedIn] = useState(false); // State variable for tracking user login status
  const [isAdmin, setIsAdmin] = useState(false); // State variable for tracking user admin status

  useEffect(() => {
    // TODO: Perform necessary logic to check if the user is logged in or not
    // Update the isLoggedIn and isAdmin variables accordingly using setIsLoggedIn and setIsAdmin setters.
  }, []);

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light " style={{ background: '#e3f2fd' }}>
        <a className="navbar-brand" href="/">
          <img
            src="/fnuc.png"
            className="navbar-link m-5 mb-0 mt-0"
            style={{ width: '15%', height: '15%' }}
            alt="Fnuc"
          />
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarToggler"
          aria-controls="navbarToggler"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarToggler">
          <ul className="navbar-nav ms-5 me-auto mb-2 mb-lg-0">
            <li
              className={`nav-item ${activePage === '/' ? 'text-decoration-underline' : ''}`}
            >
              <a className="nav-link text-dark" href="/">
                Acceuil
              </a>
            </li>
            {/* Display the 'Profil' link if the user is logged in */}
            {isLoggedIn && (
              <li
                className={`nav-item ${activePage === '/profil' ? 'text-decoration-underline' : ''}`}
              >
                <a className="nav-link text-dark" href="/profil">
                  Profil
                </a>
              </li>
            )}
            {/* Display the 'Administration' link if the user is an admin */}
            {isAdmin && (
              <li
                className={`nav-item ${activePage === '/administration' ? 'text-decoration-underline' : ''}`}
              >
                <a className="nav-link text-dark" href="/administration">
                  Administration
                </a>
              </li>
            )}
            <li
              className={`nav-item ${activePage === '/search' ? 'text-decoration-underline' : ''}`}
            >
              <a className="nav-link text-dark" href="/search">
                Recherche
              </a>
            </li>
            {/* Display the 'Connexion' and 'S'enregistrer' links if the user is not logged in */}
            {!isLoggedIn && (
              <li
                className={`nav-item ${activePage === '/signin' ? 'text-decoration-underline' : ''}`}
              >
                <a className="nav-link text-dark" href="/signin">
                  Connexion
                </a>
              </li>
            )}
            {!isLoggedIn && (
              <li
                className={`nav-item ${activePage === '/signup' ? 'text-decoration-underline' : ''}`}
              >
                <a className="nav-link text-dark" href="/signup">
                  S'enregistrer
                </a>
              </li>
            )}
            {/* Display the 'Déconnexion' button if the user is logged in */}
            {isLoggedIn && (
              <li className="nav-item">
                <a className="btn btn-danger" href="/disconnect">
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

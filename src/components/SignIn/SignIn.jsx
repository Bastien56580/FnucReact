import { useState } from 'react';
import './SignIn.scss';

export default function SignIn() {
	const [login, setLogin] = useState('');
	const [password, setPassword] = useState('');

	const handleSubmit = (e) => {
		e.preventDefault();
		alert(`Sending login: ${login}, and password: ${password}`);
	};

	return (
		<div className="signIn">
			<h1 className="signIn__title">Connexion</h1>
			<input
				type="email"
				placeholder="Email"
				value={login}
				onChange={(e) => setLogin(e.target.value)}
			/>

			<input
				type="password"
				placeholder="Mot de passe"
				value={password}
				onChange={(e) => setPassword(e.target.value)}
			/>
			<input type="submit" onClick={handleSubmit} value="Se connecter" />
		</div>
	);
}

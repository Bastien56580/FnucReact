import { useState } from 'react';

export default function SignIn() {
	const [login, setLogin] = useState('');
	const [password, setPassword] = useState('');

	const handleSubmit = (e) => {
		e.preventDefault();
		alert(`Sending login: ${login}, and password: ${password}`);
	};

	return (
		<div>
			<form>
				<div>
					<input
						type="email"
						placeholder="Email"
						value={login}
						onChange={(e) => setLogin(e.target.value)}
					/>
				</div>
				<div className="mb-3">
					<input
						type="password"
						placeholder="Mot de passe"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
					/>
				</div>
				<button type="submit" onClick={handleSubmit}>
					Valider
				</button>
			</form>
		</div>
	);
}

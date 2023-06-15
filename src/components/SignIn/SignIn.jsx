import { useState } from 'react';

export default function SignIn() {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Sending login: ${login}, and password: ${password}`);
  }

  return (
    <div className="d-flex mt-5 justify-content-center" style={{ height: "100vh" }}>
      <form className="text-center">
        <div className="mb-3">
          <input type="email" className="form-control" placeholder="Email" value={login} onChange={(e) => setLogin(e.target.value)} />
        </div>
        <div className="mb-3">
          <input type="password" className="form-control" placeholder="Mot de passe" value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
        <button type="submit" className="btn btn-success" onClick={handleSubmit}>Valider</button>
      </form>
    </div>
  );
}

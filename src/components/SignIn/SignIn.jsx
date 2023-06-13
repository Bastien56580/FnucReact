import React, { useState } from 'react'

export default function SignIn() {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`j'envois login : ${login}, et passsword : ${password}`)
  }
  
  return (
    <div>
        <input type="email" placeholder="Email" value={login} onChange={(e) => setLogin(e.target.value)}/>
        <input type="password" placeholder="Mot de passe" value={password} onChange={(e) => setPassword(e.target.value)}/>
        <input type="submit" value="Valider" onClick={handleSubmit} />
    </div>
  )
}

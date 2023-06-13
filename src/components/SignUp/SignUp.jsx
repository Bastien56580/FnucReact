import React, { useState } from 'react';

export default function SignUp(){

    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const [firstname,setFirstname] = useState("");
    const [lastname,setLastName] = useState("");

    const handleSubmit = (e) =>{
        e.preventDefault();
        alert(`Tu as envoyé email: ${email}, mot de passe : ${password}, prénom : ${firstname} et nom de famille : ${lastname}`)
    }

    const handleEmailChange = (e)=>{
        setEmail(e.target.value)
    }

    const handlePasswordChange = (e)=>{
        setPassword(e.target.value)
    }

    const handleFirstnameChange = (e)=>{
        setFirstname(e.target.value)
    }

    const handleLastNameChange = (e)=>{
        setLastName(e.target.value)
    }

    return(
        <div> 
            <div>
        <input type="email" placeholder="Email" value={email} onChange={handleEmailChange}/>
        <input type="password" placeholder="Password" value={password} onChange={handlePasswordChange}/>
        <input type="firstname" placeholder="Firstname" value={firstname} onChange={handleFirstnameChange}/>
        <input type="lastname" placeholder="Lastname" value={lastname} onChange={handleLastNameChange}/>
        <input type="submit" value="valider" onClick={handleSubmit} />
    </div>

        </div>
    )
}

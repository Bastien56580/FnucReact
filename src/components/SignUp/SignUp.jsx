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

    return(
        <div> 
            <div>
        <input type="email" placeholder="Email" value={email} onChange={(e)=> setEmail(e.target.value)}/>
        <input type="password" placeholder="Password" value={password} onChange={(e)=>setPassword(e.target.value)}/>
        <input type="firstname" placeholder="Firstname" value={firstname} onChange={(e)=>setFirstname(e.target.value)}/>
        <input type="lastname" placeholder="Lastname" value={lastname} onChange={(e)=>setLastName(e.target.value)}/>
        <input type="submit" value="valider" onClick={handleSubmit} />
    </div>

        </div>
    )
}

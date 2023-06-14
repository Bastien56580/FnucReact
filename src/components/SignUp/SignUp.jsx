import React, { useState } from 'react';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';

export default function SignUp() {
  // State variables for form inputs
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastName] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    // Create user data object
    const userData = {
      email: email,
      firstname: firstname,
      lastname: lastname,
      password: password
    };

    // Send a POST request to create a user
    axios.post('https://apimysql-1-r1261081.deta.app/customers/', userData, { withCredentials: true })
      .then(response => {
        // Handle successful response
        if (response.data.email) {
          toast.success('User created!'); // Display success toast message
        } else {
          toast.error(response.data.detail); // Display error toast message with details
        }
      })
      .catch(error => {
        // Handle error response
        toast.error(error.response.data.detail); // Display error toast message with details
      });
  }

  return (
    <div>
      <div>
        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <input type="firstname" placeholder="Firstname" value={firstname} onChange={(e) => setFirstname(e.target.value)} />
        <input type="lastname" placeholder="Lastname" value={lastname} onChange={(e) => setLastName(e.target.value)} />
        <input type="submit" value="Submit" onClick={handleSubmit} />
      </div>
      <Toaster /> {/* Toast container for displaying messages */}
    </div>
  );
}

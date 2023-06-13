import React, { useEffect, useState } from 'react';

// Mock list since you don't have a backend to test with yet
import mockList from './mock/mockList.json';

export default function ProfileList() {
    const [myData, setMyData] = useState(mockList);
    useEffect(() => {
        // Axios request or fetch profile info
        // In the meantime, we are using the mock
    }, []);

    return (
        <div className="container mt-4">
            <div className="card">

                <div className="card-body">
                    <h5 className="card-title text-center">Information du profile :</h5>
                    <ul className="list-group">
                        <li className="list-group-item">Nom: {myData.firstname}</li>
                        <li className="list-group-item">Prénom: {myData.lastname}</li>
                        <li className="list-group-item">Email: {myData.email}</li>
                        <li className="list-group-item">Mot de passe: {myData.password}</li>
                    </ul>
                </div>
            </div>
        </div>
    );
}

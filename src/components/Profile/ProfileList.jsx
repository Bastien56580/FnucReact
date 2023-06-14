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
                    <table className="table">
                        <tbody>
                            <tr>
                                <td className="fw-bold">Nom:</td>
                                <td>{myData.firstname}</td>
                            </tr>
                            <tr>
                                <td className="fw-bold">Prénom:</td>
                                <td>{myData.lastname}</td>
                            </tr>
                            <tr>
                                <td className="fw-bold">Email:</td>
                                <td>{myData.email}</td>
                            </tr>
                            <tr>
                                <td className="fw-bold">Mot de passe:</td>
                                <td>{myData.password}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

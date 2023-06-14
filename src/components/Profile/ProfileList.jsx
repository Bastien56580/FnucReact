import React, { useEffect, useState } from 'react';
import axios from 'axios';

// Mock list since you don't have a backend to test with yet
import mockList from './mock/mockList.json';

export default function ProfileList() {
    const [myData, setMyData] = useState(mockList);
    useEffect(() => {
        // Axios request or fetch profile info
        // In the meantime, we are using the mock
        
        axios
			.get('https://apimysql-1-r1261081.deta.app/customers/12', { //TODO : Change 12 to customer id
				withCredentials: true,
			})
			.then((response) => {
				// Handle successful response
				setMyData(response.data);
			})
			.catch((error) => {
				// Handle error response
				toast.error(error.response.data.detail); // Display error toast message with details
			});
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
                                <td className="fw-bold">Total dépensé :</td>
                                <td>{myData.cumulative_sales}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

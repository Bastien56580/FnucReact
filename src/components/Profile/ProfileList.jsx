
import { useEffect, useState } from 'react';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import mockList from './mock/mockList.json';

export default function ProfileList() {
    const [myData, setMyData] = useState("");
    const baseUrl = sessionStorage.getItem("REACT_APP_BACK_URL");
    const mock = sessionStorage.getItem("REACT_APP_MOCK");
    useEffect(() => {
        if (mock === "true") {
            setMyData(mockList);

        } else if (mock === "false") {
            axios
                .get(baseUrl + '/customers/12', { //TODO : Change 12 to customer id
                    withCredentials: true,
                })
                .then((response) => {
                    // Handle successful response
                    setMyData(response.data);
                })
                .catch((error) => {
                    // Handle error response
                    console.log(error);
                    toast.error(error.response.data.detail); // Display error toast message with details
                });
        }
    }, []);

    return (
        <div className="container mt-4">
            <div className="card">

                <div className="card-body">
                    <h5 className="card-title text-center">Information du profile :</h5>
                    <table className="table">
                        {myData !== "" ? (
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
                        ) : (
                            <tbody>
                                <tr>
                                    <td>Loading</td>
                                </tr>
                            </tbody>

                        )}
                    </table>
                </div>
            </div>
            <Toaster />
        </div>
    );
}

import { useEffect, useState } from 'react';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import "../../css/style.css"

// Mock list since you don't have a backend to test with yet
import mockList from './mock/mockList.json';

export default function ProfileList() {
    const [myData, setMyData] = useState(mockList);
    const baseUrl = sessionStorage.getItem("REACT_APP_BACK_URL");

    useEffect(() => {
        // Axios request or fetch profile info
        // In the meantime, we are using the mock data
        axios
            .get(baseUrl + '/topics/', {
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
        <div className="container mt-5">
            <h2>Topic List</h2>
            <table className="table table-striped table-bordered border-dark table-responsive">
                <thead>
                    <tr>
                        <th scope="col">Name</th>
                        <th scope="col">Topic URL</th>
                    </tr>
                </thead>
                <tbody>
                    {myData.map((item) => (
                        <tr key={item.id}>
                            <td>{item.label}</td>
                            <td>
                                <img src={item.topic_url}
                                    alt="Topic Cover"
                                    className="img-thumbnail"
                                    style={{ maxWidth: '160px', maxHeight: '75px' }}>

                                </img>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <Toaster /> {/* Toast container for displaying messages */}
        </div>
    );
}

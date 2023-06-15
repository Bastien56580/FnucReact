import { useEffect, useState } from 'react';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';

// Mock list since you don't have a backend to test with yet
import mockList from './mock/mockList.json';

export default function ProfileList() {
    const [myData, setMyData] = useState(mockList);

    useEffect(() => {
        // Axios request or fetch profile info
        // In the meantime, we are using the mock data
        axios
            .get('https://apimysql-1-r1261081.deta.app/topics/', {
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
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th scope="col">ID</th>
                        <th scope="col">Name</th>
                        <th scope="col">Topic URL</th>
                    </tr>
                </thead>
                <tbody>
                    {myData.map((item) => (
                        <tr key={item.id}>
                            <td>
                                <strong>{item.id}</strong>
                            </td>
                            <td>{item.label}</td>
                            <td>
                                <a href={item.topic_url} target="_blank" rel="noopener noreferrer">
                                    {item.topic_url}
                                </a>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <Toaster /> {/* Toast container for displaying messages */}
        </div>
    );
}

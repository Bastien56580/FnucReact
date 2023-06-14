import toast from 'react-hot-toast'
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

import Order from '../../components/Order/Order.jsx';
import BookDetail from '../../components/BookDetail/BookDetail.jsx';
import Navbar from '../../components/Navbar/Navbar';

import mockB from "./mock/mockBook.json";

export default function DetailOrder() {
    const [myData, setMyData] = useState(mockB);
    const { id } = useParams(); // Récupération de la valeur 'id' depuis l'URL
    useEffect(() => {
        // Axios request or fetch the book from the id info and setMyData
        // In the meantime, we are using the mock
        axios
			.get('https://apimysql-1-r1261081.deta.app/books/'+id, {
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

    }, [id]);

    return (
        <div className="DetailOrder">
            <Navbar />
            <div className="container">
                <div className="row">
                    <div className="col-md-6">
                        <BookDetail book={myData} />
                    </div>
                    <div className="col-md-6">
                        <Order book={myData} />
                    </div>
                </div>
            </div>
        </div>

    );
}

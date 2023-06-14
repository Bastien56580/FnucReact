import React, { useEffect, useState } from 'react';

import Order from '../../components/Order/Order.jsx';
import BookDetail from '../../components/BookDetail/BookDetail.jsx';
import Navbar from '../../components/Navbar/Navbar';

import mockB from "./mock/mockBook.json";

export default function DetailOrder() {
    const [myData, setMyData] = useState(mockB);
    useEffect(() => {
        // Axios request or fetch the book from the id info and setMyData
        // In the meantime, we are using the mock
    }, []);

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

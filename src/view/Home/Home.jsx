import React from 'react';
import CategoryList from '../../components/CategoryList/CategotyList';
import Navbar from '../../components/Navbar/Navbar';

export default function Home() {
    return (

        <div className="Home">
            <Navbar />
            <CategoryList />
        </div>
    );
}

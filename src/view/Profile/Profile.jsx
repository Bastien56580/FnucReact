import React from 'react';
import ProfileList from '../../components/Profile/ProfileList.jsx';
import ProfileGraph from '../../components/Profile/ProfileGraph';
import Navbar from '../../components/Navbar/Navbar';

export default function Profile() {
	return (

		<div className="Profile">
			<Navbar />
			<ProfileList />
			<ProfileGraph />
		</div>
	);
}

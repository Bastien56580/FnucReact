import ProfileList from '../../components/Profile/ProfileList.jsx';
import ProfileGraph from '../../components/Profile/ProfileGraph';
import Navbar from '../../components/Navbar/Navbar';
import './Profile.scss';

export default function Profile() {
	return (
		<div className="Profile">
			<Navbar />
			<div className="cardList">
				<div className="cardList__card--short">
					<ProfileList />
				</div>
				<div className="cardList__card--big">
					<ProfileGraph />
				</div>
			</div>
		</div>
	);
}

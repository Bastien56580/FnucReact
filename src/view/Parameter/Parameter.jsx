import Navbar from '../../components/Navbar/Navbar';
import SwitchBack from '../../components/Parameter/SwitchBack';
import EnableMock from '../../components/Parameter/EnableMock';
import MagicTest from '../../components/Parameter/MagicTest';
import './Parameter.scss';

export default function Parameter() {
	return (
		<>
			<Navbar />
			<div className="cardList">
				<div className="cardList__card">
					<h1 className="cardList__card__title">Paramètres :</h1>
					<SwitchBack />
					<EnableMock />
				</div>
				<div className="cardList__card">
					<h1 className="cardList__card__title">Tests</h1>
					<MagicTest />
				</div>
			</div>
		</>
	);
}

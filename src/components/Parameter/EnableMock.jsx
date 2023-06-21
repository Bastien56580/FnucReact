import { useState } from 'react';
import { SwitchMock } from './script/SwitchMock';
import './EnableMock.scss';

const EnableMock = () => {
	const [mock, setMock] = useState(sessionStorage.getItem('REACT_APP_MOCK'));

	const handleSwitch = () => {
		SwitchMock();
		setMock(sessionStorage.getItem('REACT_APP_MOCK'));
	};

	return (
		<div className="switchMock">
			<h2 className="switchMock__title">
				Les mock sont : {mock == 'true' ? 'Activés' : 'Désactivés'}
			</h2>
			<button onClick={handleSwitch} className="switchMock__button">
				Activer / Désactiver les mocks
			</button>
		</div>
	);
};

export default EnableMock;

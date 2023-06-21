import { useState } from 'react';
import { SwitchEnv } from './script/SwitchEnv';
import './SwitchBack.scss';

const SwitchBack = () => {
	const [currentValue, setCurrentValue] = useState(
		sessionStorage.getItem('REACT_APP_BACK_URL')
	);

	const handleSwitch = () => {
		SwitchEnv();
		setCurrentValue(sessionStorage.getItem('REACT_APP_BACK_URL'));
	};

	return (
		<div className="switchBDD">
			<h2 className="switchBDD__title">
				Connecté à :{' '}
				{currentValue == 'https://apimysql-1-r1261081.deta.app'
					? 'mySQL'
					: 'MongoDB'}
			</h2>
			<button onClick={handleSwitch} className="switchBDD__button">
				Changer de back
			</button>
		</div>
	);
};

export default SwitchBack;

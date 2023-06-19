import { useState } from 'react';
import { SwitchEnv } from './script/SwitchEnv';

const SwitchBack = () => {
	const [currentValue, setCurrentValue] = useState(
		sessionStorage.getItem('REACT_APP_BACK_URL')
	);

	const handleSwitch = () => {
		SwitchEnv();
		setCurrentValue(sessionStorage.getItem('REACT_APP_BACK_URL'));
	};

	return (
		<div>
			<div>
				<div>
					<h5>
						Connecté à :{' '}
						{currentValue == 'https://apimysql-1-r1261081.deta.app'
							? 'mySQL'
							: 'MongoDB'}
					</h5>
					<button onClick={handleSwitch}>Changer de back</button>
				</div>
			</div>
		</div>
	);
};

export default SwitchBack;

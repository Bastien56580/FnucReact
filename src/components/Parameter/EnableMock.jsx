import { useState } from 'react';
import { SwitchMock } from './script/SwitchMock';

const EnableMock = () => {
	const [mock, setMock] = useState(sessionStorage.getItem('REACT_APP_MOCK'));

	const handleSwitch = () => {
		SwitchMock();
		setMock(sessionStorage.getItem('REACT_APP_MOCK'));
	};

	return (
		<div>
			<div>
				<div>
					<h5>
						Les mock sont :{' '}
						{mock == 'true' ? 'Activés' : 'Désactivés'}
					</h5>
					<button onClick={handleSwitch}>
						Activer / Désactiver les mocks
					</button>
				</div>
			</div>
		</div>
	);
};

export default EnableMock;

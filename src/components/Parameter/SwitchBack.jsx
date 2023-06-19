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
        <div className="container mt-4">
            <h3>Connecté à : {currentValue}</h3>
            <button className="btn btn-primary mt-3" onClick={handleSwitch}>
                Changer de back
            </button>
        </div>
    );
};

export default SwitchBack;

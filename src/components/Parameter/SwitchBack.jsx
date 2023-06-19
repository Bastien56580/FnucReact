import { useState } from 'react';
import { SwitchEnv } from './script/SwitchEnv';
import '../../css/style.css';

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
            <div className="card">
                <div className="card-body">
                    <h5 className="card-title">Connecté à : {currentValue == "https://apimysql-1-r1261081.deta.app" ? 'mySQL' : 'MongoDB'}</h5>
                    <button className="btn btn-custom-primary mt-3" onClick={handleSwitch}>
                        Changer de back
                    </button>
                </div>
            </div>
        </div>
    );
};

export default SwitchBack;

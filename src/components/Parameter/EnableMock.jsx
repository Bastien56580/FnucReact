import React, { useState } from 'react';
import { SwitchMock } from './script/SwitchMock';
import '../../css/style.css';

const EnableMock = () => {
    const [mock, setMock] = useState(
        sessionStorage.getItem('REACT_APP_MOCK')
    );

    const handleSwitch = () => {
        SwitchMock();
        setMock(sessionStorage.getItem('REACT_APP_MOCK'));
    };

    return (
        <div className="container mt-4">
            <div className="card">
                <div className="card-body">
                    <h5 className="card-title">Les mock sont : {mock == "true" ? 'Activés' : 'Désactivés'}</h5>
                    <button className="btn btn-custom-primary mt-3" onClick={handleSwitch}>
                        Activer / Désactiver les mocks
                    </button>
                </div>
            </div>
        </div>
    );
};

export default EnableMock;

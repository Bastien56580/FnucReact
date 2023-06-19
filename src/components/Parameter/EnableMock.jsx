import React, { useState } from 'react';
import { SwitchMock } from './script/SwitchMock';

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
            <h3>Les mock sont : {mock}</h3>
            <button className="btn btn-primary mt-3" onClick={handleSwitch}>
                Activer / Désactiver les mocks
            </button>
        </div>
    );
};

export default EnableMock;

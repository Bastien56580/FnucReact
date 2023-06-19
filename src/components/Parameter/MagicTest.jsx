import { useState, useEffect } from 'react';
import '../../css/style.css';
import '../../css/magic.css';

const MagicTest = () => {
    const [renderButton, setRenderButton] = useState(true);

    useEffect(() => {
        const handleMouseMove = (e) => {
            const button = document.getElementById('magic-button');
            const rect = button.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;
            const distance = Math.sqrt(
                (e.clientX - centerX) ** 2 + (e.clientY - centerY) ** 2
            );

            if (distance < 100) {
                button.classList.add('button-move-away');
                button.addEventListener('animationend', handleAnimationEnd);
            }
        };

        const handleAnimationEnd = () => {
            setRenderButton(false);
        };

        document.addEventListener('mousemove', handleMouseMove);

        return () => {
            document.removeEventListener('mousemove', handleMouseMove);
        };
    }, []);

    return (
        <div className="container mt-4">
            <div className="card">
                <div className="card-body">
                    <h5 className="card-title">Dernier coverage : 97.21%</h5>
                    {renderButton && (
                        <button
                            id="magic-button"
                            className="btn btn-magic mt-3"
                        >
                            Lancer les tests
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default MagicTest;

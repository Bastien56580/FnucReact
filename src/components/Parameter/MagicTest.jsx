import { useState, useEffect } from 'react';
import '../../css/magic.css';
import './MagicTest.scss';

/**
 * Bouton magique
 */
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
		<div className="test">
			<h2 className="test__title">Dernier coverage : 97.21%</h2>
			{renderButton && (
				<button id="magic-button" className="btn-magic test__button">
					Lancer les tests
				</button>
			)}
		</div>
	);
};

export default MagicTest;

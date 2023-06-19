import React, { useState, useEffect } from 'react';
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
		<div>
			<div>
				<div>
					<h5>Dernier coverage : 97.21%</h5>
					{renderButton && (
						<button id="magic-button" className="btn-magic">
							Lancer les tests
						</button>
					)}
				</div>
			</div>
		</div>
	);
};

export default MagicTest;

import './Loading.scss';

/**
 * Animation de chargement
 */
export default function LoadingComponent() {
	return (
		<div className="container d-flex align-items-center justify-content-center  lds-roller ">
			<div></div>
			<div></div>
			<div></div>
			<div></div>
			<div></div>
			<div></div>
			<div></div>
			<div></div>
		</div>
	);
}

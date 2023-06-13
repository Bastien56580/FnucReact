import { useRouteError } from 'react-router-dom';
import Navbar from '../../components/Navbar/Navbar';

export default function ErrorPage() {
	const error = useRouteError();

	return (
		<div id="error-page">
			<Navbar />
			<div className="">
				<div className="col d-flex justify-content-center align-items-center">
					<div className="row">
						<h1 className="m-5">Ooups!</h1>
					</div>
					<div className="row">
						<h4>Désolé il y a une erreur qui a eu lieu.</h4>
					</div>
				</div>
			</div>
		</div>
	);
}

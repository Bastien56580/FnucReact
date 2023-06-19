import Navbar from '../../components/Navbar/Navbar';
import SwitchBack from '../../components/Parameter/SwitchBack';
import EnableMock from '../../components/Parameter/EnableMock';
import MagicTest from '../../components/Parameter/MagicTest';

export default function Parameter() {
	return (
		<div className="Parameter">
			<Navbar />
			<div className="container">
				<div className="row">
					<div className="col-md-6 mt-5 mb-3">
						<h1>Paramètres :</h1>
					</div>
				</div>
				<div className="row">
					<div className="col-md-6">
						<div className="mb-3">
							<SwitchBack />
						</div>
					</div>
					<div className="col-md-6">
						<div className="mb-3">
							<EnableMock />
						</div>
					</div>
				</div>
				<div className="row">
					<div className="col-md-6 mt-5 mb-3">
						<h1>Tests</h1>
						<MagicTest />
					</div>
				</div>
			</div>
		</div>
	);
}

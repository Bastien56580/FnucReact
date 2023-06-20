import { useState } from 'react';
import CategoryList from '../../components/CategoryList/CategotyList';
import Navbar from '../../components/Navbar/Navbar';
import ListBookByTopic from '../../components/ListBookByTopic/ListBookByTopic';
import './Home.scss';
import BestSeller from '../../components/BestSeller/BestSeller';

export default function Home() {
	const [topicId, setTopicId] = useState();

	const handleTopicId = (topicId) => {
		setTopicId(topicId);
	};

	return (
		<>
			<Navbar />
			<div className="cardList">
				<div className="cardList__card">
					<CategoryList handleTopicId={handleTopicId} />
				</div>

				{topicId ? (
					<div className="cardList__card">
						<ListBookByTopic topicId={topicId} />
					</div>
				) : (
					<div className="cardList__card">
						<BestSeller />
					</div>
				)}
			</div>
		</>

		// <div className="Home">
		// 	<Navbar />
		// 	<div className="container">
		// 		<div className="row">
		// 			<div className="col-md-6">
		// 				<div className="mb-3">
		// 					<CategoryList handleTopicId={handleTopicId} />
		// 				</div>
		// 			</div>
		// 			<div className="col-md-6">
		// 				<div className="mb-3">
		// 					{topicId ? (
		// 						<ListBookByTopic topicId={topicId} />
		// 					) : (
		// 						<div className="container mt-5 pt-5">
		// 							<div className="row justify-content-center">
		// 								<div className="col-md-8">
		// 									<div>
		// 										<img
		// 											src="https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Fecx.images-amazon.com%2Fimages%2FI%2F51qPIdBKwkL._SX258_BO1%2C204%2C203%2C200_.jpg&f=1&nofb=1&ipt=9a2141a13e9aca290cd235041a2a0f16ff8c9f492bf6250a978b18fea8039fc6&ipo=images"
		// 											alt="Talend BestSeller"
		// 											className="img-thumbnail"
		// 										/>
		// 									</div>
		// 								</div>
		// 							</div>
		// 						</div>
		// 					)}
		// 				</div>
		// 			</div>
		// 		</div>
		// 	</div>
		// </div>
	);
}

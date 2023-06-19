import { useState } from 'react';
import CategoryList from '../../components/CategoryList/CategotyList';
import Navbar from '../../components/Navbar/Navbar';
import ListBookByTopic from '../../components/ListBookByTopic/ListBookByTopic';

export default function Home() {
	const [topicId, setTopicId] = useState();

	const handleTopicId = (topicId) => {
		setTopicId(topicId);
	};

	return (
		<div className="Home">
			<Navbar />
			<CategoryList handleTopicId={handleTopicId} />
			{topicId ? (
				<ListBookByTopic topicId={topicId} />
			) : (
				<img
					src="https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Fecx.images-amazon.com%2Fimages%2FI%2F51qPIdBKwkL._SX258_BO1%2C204%2C203%2C200_.jpg&f=1&nofb=1&ipt=9a2141a13e9aca290cd235041a2a0f16ff8c9f492bf6250a978b18fea8039fc6&ipo=images"
					alt="Talend BestSeller"
					className="img-thumbnail"
				/>
			)}
		</div>
	);
}

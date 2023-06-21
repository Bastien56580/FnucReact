import Navbar from '../../components/Navbar/Navbar';
import KeywordList from '../../components/KeywordList/KeywordList';
import TopicList from '../../components/TopicList/TopicList';

export default function AdminIndexes() {
	return (
		<>
			<Navbar />
			<TopicList />
			<KeywordList />
		</>
	);
}

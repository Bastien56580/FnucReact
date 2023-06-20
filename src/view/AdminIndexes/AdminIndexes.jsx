import Navbar from '../../components/Navbar/Navbar';
import KeywordList from '../../components/KeywordList2/KeywordList2';
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

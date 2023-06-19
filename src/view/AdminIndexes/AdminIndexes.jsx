import Navbar from '../../components/Navbar/Navbar';
import KeywordList2 from '../../components/KeywordList2/KeywordList2';
import TopicList from '../../components/TopicList/TopicList';

export default function AdminIndexes() {
	return (
		<>
			<Navbar />
			<TopicList/>
			<KeywordList2/>
		</>
	);
}

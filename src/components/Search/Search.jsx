import { useEffect, useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import SearchIcon from '@mui/icons-material/Search';
import './Search.scss';

export default function Search() {
	const [limit] = useState(9);
	const [offset, setOffset] = useState(0);
	const [keywords, setKeywords] = useState([]);
	const [selectedKeywords, setSelectedKeywords] = useState([]);
	const [searchValue, setSearchValue] = useState('');
	const baseUrl = sessionStorage.getItem('REACT_APP_BACK_URL');

	useEffect(() => {
		axios
			.get(baseUrl + `/keywords/?limit=${limit}&offset=${offset}`, {
				withCredentials: true,
			})
			.then((response) => {
				// Handle successful response
				setKeywords(response.data);
			})
			.catch((error) => {
				// Handle error response
				toast.error(error.response.data.detail); // Display error toast message with details
			});
	}, [offset]);

	const removeWord = (word) => {
		const array = [...selectedKeywords]; // make a separate copy of the array
		const index = selectedKeywords.indexOf(word);
		if (index !== -1) {
			array.splice(index, 1);
			setSelectedKeywords(array);
		}
	};

	const handleSelectedKeywords = (word, add) => {
		add ? selectedKeywords.push(word) : removeWord(word);
	};

	const handleSubmit = () => {
		console.log(searchValue, selectedKeywords);
	};

	return (
		<>
			<div className="search__listKeyword">
				{keywords.map((item, index) => {
					return (
						<>
							{/* {index % 3 === 0 && (
								<div key={'sep' + item.label + index}></div>
							)} */}
							<KeywordItem
								key={item.label + index}
								word={item.label}
								updateSelectedKeywords={handleSelectedKeywords}
							/>
						</>
					);
				})}
			</div>
			<div className="search__pagination">
				{offset != 0 ? (
					<button onClick={() => setOffset(offset - limit)}>
						Page Précédente
					</button>
				) : (
					<button disabled>Page Précédente</button>
				)}
				{<b>page {offset / limit + 1}</b>}
				{keywords.length >= limit ? (
					<button onClick={() => setOffset(offset + limit)}>
						Page Suivante
					</button>
				) : (
					<button disabled>Page Suivante</button>
				)}
			</div>
		</>
	);
}

function KeywordItem({ word, updateSelectedKeywords }) {
	const [checked, setChecked] = useState(false);

	const handleOnClick = () => {
		setChecked(!checked);
		checked
			? updateSelectedKeywords(word, false)
			: updateSelectedKeywords(word, true);
	};

	return (
		<div className="keyword">
			<input
				id={word}
				name={word}
				type="checkbox"
				className="keyword__input"
				onClick={handleOnClick}
			/>
			<label htmlFor={word} className="keyword__label">
				{word}
			</label>
		</div>
	);
}

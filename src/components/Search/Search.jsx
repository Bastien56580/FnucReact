import { useEffect, useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import SearchIcon from '@mui/icons-material/Search';

export default function Search() {
	const [limit] = useState(9);
	const [offset,setOffset] = useState(0);
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
			<div>
				<h2>Liste des mots-clés</h2>
				<input
					type="search"
					placeholder="Rechercher..."
					onChange={(e) => setSearchValue(e.target.value)}
				/>
				<button onClick={handleSubmit}>
					<SearchIcon />
				</button>
				<select name="option">
					<option value="">--Option de recherche--</option>
					<option value="in">OU</option>
					<option value="with">ET</option>
					<option value="without">SAUF</option>
				</select>
				<div>
					{keywords.map((item, index) => {
						return (
							<>
								{index % 3 === 0 && (
									<div key={'sep' + item.label + index}></div>
								)}
								<div
									style={{ display: 'flex', margin: '15px' }}
								>
									<KeywordItem
										key={item.label + index}
										word={item.label}
										updateSelectedKeywords={handleSelectedKeywords}
										
									/>
								</div>
							</>
						);
					})}
				</div>
				{offset != 0 ? <button className='btn btn-custom-primary me-5' onClick={() => setOffset(offset - limit)}>Page Précédente</button>:<button className='btn btn-custom-primary me-5' disabled>Page Précédente</button>}
					{<b className='me-5'>page {(offset/limit) + 1}</b>}
					{keywords.length >= limit ? <button  className='btn btn-custom-primary' onClick={() => setOffset(offset + limit)}>Page Suivante</button>:<button className='btn btn-custom-primary' disabled>Page Suivante</button>}
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
		<div>
			<input id={word} name={word} type="checkbox" onClick={handleOnClick} />
			<label htmlFor={word}>{word}</label>
		</div>
	);
}

import { useEffect, useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';

import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import SearchIcon from '@mui/icons-material/Search';
import { right } from '@popperjs/core';

export default function Search() {
	const [keywords, setKeywords] = useState([]);
	const [selectedKeywords, setSelectedKeywords] = useState([]);
	const [searchValue, setSearchValue] = useState('');
	const baseUrl = sessionStorage.getItem('REACT_APP_BACK_URL');

	useEffect(() => {
		axios
			.get(baseUrl + '/keywords/', {
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
	}, []);

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
		console.log(searchValue);
	};

	return (
		<>
			<div className="container mt-5">
				<h2>Liste des mots-clés</h2>
				<input
					type="search"
					placeholder="Rechercher..."
					onChange={(e) => setSearchValue(e.target.value)}
				/>
				<button onClick={handleSubmit}>
					<SearchIcon />
				</button>
				<select name="option" id="search-option">
					<option value="">--Option de recherche--</option>
					<option value="in">Dans la liste</option>
					<option value="with">A la fois</option>
					<option value="without">Sauf</option>
				</select>
        <div className='row'>
				{keywords.map((item, index) => {
          return (
            <>
            {
              index % 3 === 0 &&  <div className="w-100" key={"sep"+item.label+index}></div>
            }
            <div className='col' style={{display: 'flex', margin: '15px'}}>
              <KeywordItem key={item.label + index} word={item.label} />
            </div>
            </>
        )
        
					
				})}
        
			</div>
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
		<>
			<button onClick={handleOnClick}>
				{checked ? <CheckBoxIcon /> : <CheckBoxOutlineBlankIcon />}
			</button>
      <p>{word}</p>
		</>
	);
}

import { useEffect, useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import SearchIcon from '@mui/icons-material/Search';

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
		console.log(searchValue, selectedKeywords);
	};

	return (
		<div>
			<div className="container col-md-6 mt-5">
				<h2>Liste des mots-clés</h2>
				<div className="d-flex align-items-center">
					<input
						type="search"
						placeholder="Rechercher..."
						className="me-1 form-control"
						onChange={(e) => setSearchValue(e.target.value)}
					/>
					<button onClick={handleSubmit} className="btn btn-outline-dark">
						<SearchIcon />
					</button>
				</div>
				<select name="option" id="search-option" className="form-select mt-2">
					<option value="">--Option de recherche--</option>
					<option value="in">OU</option>
					<option value="with">ET</option>
					<option value="without">SAUF</option>
				</select>

				<div className='row'>
					{keywords.map((item, index) => {
						return (
							<>
								{
									index % 3 === 0 && <div className="w-100" key={"sep" + item.label + index}></div>
								}
								<div className='col' style={{ display: 'flex', margin: '15px' }}>
									<div className="container">
										<ul className="list-group">
											<li className="list-group-item">
												<KeywordItem key={item.label + index} word={item.label} updateSelectedKeywords={handleSelectedKeywords} />
											</li>
										</ul>
									</div>
								</div>
							</>
						)


					})}

				</div>
			</div>
		</div>
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
			<input id={word} name={word} type="checkbox" className="form-check-input me-2" onClick={handleOnClick} />
			<label htmlFor={word}>{word}</label>
		</div>
	);
}


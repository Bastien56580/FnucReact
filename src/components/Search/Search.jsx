import { useEffect, useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import SearchIcon from '@mui/icons-material/Search';
import './Search.scss';

/**
 * Barre de recherche par mot clé
 */
export default function Search() {
	const [limit] = useState(9);
	const [offset, setOffset] = useState(0);
	const [keywords, setKeywords] = useState([]);
	const [data, setData] = useState([]);
	const [selectedKeywords, setSelectedKeywords] = useState([]);
	const baseUrl = sessionStorage.getItem('REACT_APP_BACK_URL');
	const [operator, setOperator] = useState('and');
	const [searched, setSearched] = useState(false); // State to track if search button is clicked

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
		let filter = `operator=${operator}`;
		selectedKeywords.forEach((element, index) => {
			filter += `&keyword${index + 1}=${element}`;
		});
		axios
			.get(
				baseUrl + `/books/?${filter}&limit=${limit}&offset=${offset}`,
				{
					withCredentials: true,
				}
			)
			.then((response) => {
				// Handle successful response
				setData(response.data);
				setSearched(true); // Set searched to true when search button is clicked
			})
			.catch((error) => {
				// Handle error response
				toast.error(error.response.data.detail); // Display error toast message with details
			});
		console.log(data);
	};

	return (
		<>
			<div className="search">
				<h1 className="search__title">Liste des mots-clés</h1>
				<div className="search__searchbar">
					<input type="search" placeholder="Rechercher..." />
					<button onClick={handleSubmit}>
						<SearchIcon />
					</button>
					<select
						name="option"
						id="search-option"
						onChange={(e) => {
							setOperator(e.target.value);
						}}
					>
						<option value="or">OU</option>
						<option value="and" selected>
							ET
						</option>
						<option value="not">SAUF</option>
					</select>
				</div>

				<div className="search__listKeyword">
					{keywords.map((item, index) => {
						return (
							<KeywordItem
								key={item.label + index}
								word={item}
								updateSelectedKeywords={handleSelectedKeywords}
							/>
						);
					})}
				</div>
				<div className="search__pagination">
					{offset !== 0 ? (
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
			</div>
			{searched && (
				<div className="result">
					<h1 className="result__title">Liste des livres</h1>
					<table className="result__table">
						<thead>
							<tr>
								<th>Titre</th>
								<th>Auteur</th>
								<th>Prix</th>
							</tr>
						</thead>
						<tbody>
							{data.map((element) => {
								return (
									<tr
										key={element.id}
										onClick={() =>
											(window.location.href = `/detail-order/${element.id}`)
										}
									>
										<td>{element.title}</td>
										<td>{element.author}</td>
										<td>{element.price}</td>
									</tr>
								);
							})}
						</tbody>
					</table>
				</div>
			)}
		</>
	);
}

/**
 * List de mot clé
 * @param {object} param0
 * 	{
 * 	 word : string
 * 	 updateSelectedKeywords : function
 * }
 */
function KeywordItem({ word, updateSelectedKeywords }) {
	const [checked, setChecked] = useState(false);

	const handleOnClick = () => {
		setChecked(!checked);
		checked
			? updateSelectedKeywords(word.id, false)
			: updateSelectedKeywords(word.id, true);
	};

	return (
		<div className="keyword">
			<input
				name={word.label}
				type="checkbox"
				className="keyword__input"
				onClick={handleOnClick}
			/>
			<label htmlFor={word.label} className="keyword__label">
				{word.label}
			</label>
		</div>
	);
}

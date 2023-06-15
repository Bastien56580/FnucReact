import { useEffect, useState } from 'react';
import axios from 'axios';

export default function Search() {
  const [keywords, setKeywords] = useState([]);

	useEffect(() => {
		axios
			.get('https://apimysql-1-r1261081.deta.app/keywords/', {
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
     const handleSubmit = () =>{}

  return (
    <>
    {console.log(keywords)}
    <div className="container mt-5">
      <h2>Liste des mots-clés</h2>
      <table className="table table-striped">
        <thead>
          <tr>
            <th scope="col"></th>
            <th scope="col">Liste Mots-Clés</th>
          </tr>
        </thead>
        <tbody>
          {keywords.map((item) => (
            <tr key={item}>
              <td><KeywordItem word={item.label}/></td>
              <td>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      
      { <input type="submit" value="Rechercher" onClick={handleSubmit} />}
    </div>
  
    </>
  )
}

function KeywordItem({word}) {
  const [checked,setChecked] = useState(false);
  return <><button onClick={() => setChecked(!checked)}>{checked ? '☑':'☐'}</button><ul>{word}</ul></>
}
          

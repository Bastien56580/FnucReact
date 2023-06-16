import { useEffect, useState } from 'react';
import axios from 'axios';
import toast  from 'react-hot-toast';

import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';

export default function Search() {
  const [keywords, setKeywords] = useState([]);
  let [selectedKeywords, setSelectedKeywords] = useState([]);

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

  const removeWord = (word) => {
  const array = [...selectedKeywords]; // make a separate copy of the array
  const index = selectedKeywords.indexOf(word)
  if (index !== -1) {
    array.splice(index, 1);
    setSelectedKeywords(array);
  }
  }

  const handleSelectedKeywords = (word,add) => {
    add ? selectedKeywords.push(word) : removeWord(word);
  }

  const handleSubmit = () => { 
    
  }

  return (
    <>
      <div className="container mt-5">
        <h2>Liste des mots-clés</h2>
        <table className="table table-striped">
          <tbody>
            {keywords.map((item) => (
              <tr key={item}>
                <td><KeywordItem word={item.label} updateSelectedKeywords={handleSelectedKeywords} /></td>
                <td>
                  {item.label}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <select name="option" id="search-option">
          <option value="">--Option de recherche--</option>
          <option value="in">Dans la liste</option>
          <option value="with">A la fois</option>
          <option value="without">Sauf</option>
        </select>
        {<input type="submit" value="Rechercher" onClick={handleSubmit} />}
      </div>

    </>
  )
}

function KeywordItem({ word,updateSelectedKeywords }) {
  const [checked, setChecked] = useState(false);

  const handleOnClick = () => {
    setChecked(!checked);
    checked ? updateSelectedKeywords(word,false) : updateSelectedKeywords(word,true);
  }

  return <><button onClick={handleOnClick}>{checked ?  <CheckBoxIcon/>:<CheckBoxOutlineBlankIcon/>}</button></>
}


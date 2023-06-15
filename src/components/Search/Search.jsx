import { useEffect, useState } from 'react';
import axios from 'axios';

export default function Search() {
  const [myData, setMyData] = useState("");
  axios
  .get('https://apimysql-1-r1261081.deta.app/keywords/', {
      withCredentials: true,
  })
  .then((response) => {
      // Handle successful response
      setMyData(response.data);
  })
  .catch((error) => {
      // Handle error response
      toast.error(error.response.data.detail); // Display error toast message with details
  });
  

  return (
    <>
    {console.log("😊",myData,"😊")}
    {console.log(typeof myData)}
    <div className="container mt-5">
      <h2>Topic List</h2>
      <table className="table table-striped">
        <thead>
          <tr>
            <th scope="col"></th>
            <th scope="col">Liste Mots-Clés</th>
          </tr>
        </thead>
        <tbody>
          {myData.map((item) => (
            <tr key={item}>
              <td>{item.list}</td>
              <td>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <input type="submit" value="Rechercher" onClick={handleSubmit} />
    </div>
  
    </>
  )
          }

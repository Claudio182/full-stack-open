import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom/client';
import axios from 'axios'
import Content from './Components/Content'


const App = () => {
  const [allCountries, setAllCountries] = useState([])
  const [findCountries, setFindCountries] = useState([])
  const [searchCountries, setSearchCountries] = useState('')

  useEffect(() => {
    axios
      .get('https://restcountries.com/v3.1/all?fields=name,flags,capital,languages,population,latlng')
      .then( response => {
        setAllCountries(response.data)
      })
  }, []);
    
  const handleSearchCountries = (event) => {
    setSearchCountries(event.target.value)
    if (searchCountries){
      const regex = new RegExp( searchCountries, 'i' )
      const filterAllCountries = () => allCountries.filter( country => country.name.common.match(regex) )
      setFindCountries(filterAllCountries)
    }
  }

  return (
    <div>
      <div>
        find countries <input value={searchCountries} onChange={handleSearchCountries} />
      </div>
      <div>
        <Content  findCountries={findCountries} setFindCountries={setFindCountries} />
      </div>
    </div>
  )
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// findCountries.length <= 10 ?
//             findCountries.map( el => <p key={el.name.common}>{el.name.common}</p> ) :
//             <p>To many matches, specify another filter</p>
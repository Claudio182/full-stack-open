import React from "react";
import Country from './Country'


const Content = ({ findCountries, setFindCountries }) => {
    if (findCountries.length > 10) {
        return <p>To many matches, specify another filter</p>
    } else if ((findCountries.length <= 10 && findCountries.length >= 2) || findCountries.length === 0 ) {
        return (
            <ul>
                {findCountries.map( country => 
                <li key={country.name.common}>{country.name.common} <button onClick={() =>setFindCountries([country])}>show</button></li>
                )}
            </ul>
        )
    } else {
        // console.log(findCountries)
        return <Country findCountries={findCountries[0]} />
    }
}

export default Content
import React, { useEffect, useState } from "react";
import axios from 'axios'

const Country = ({ findCountries }) => {
    const [weather, setWeather] = useState([])
    const country = findCountries

    useEffect( () => {
        const api_key= process.env.REACT_APP_API_KEY
        const weatherUrl = 'http://api.openweathermap.org/data/2.5/weather?'

        axios.get(`${weatherUrl}q=${country.capital}&appid=${api_key}&units=metric`)
                .then(response => {
                const apiResponse = response.data;
                console.log(apiResponse)
                setWeather(apiResponse)
            }).catch(error => {
                console.log(error);
            })
    }, [])
    console.log(weather)
    return (
        <div>
            <h2>{country.name.common}</h2>
            <p>capital {country.capital}</p>
            <p>population {country.population}</p>
            <h4>Languages</h4>
            <ul>
                {Object.values(country.languages).map((el, i) => <li key={i}>{el}</li>)}
            </ul>
            <img src={country.flags.png} alt="" />
            <h2>Weather in {weather.name}</h2>
            <p><strong>temperature in:</strong> {weather.main.temp}°C</p>
            <img src={`http://openweathermap.org/img/w/${weather.weather[0].icon}.png`} alt="" />
            <p><strong>wind</strong> {weather.wind.speed} mph</p>
        </div>
    )
}

export default Country
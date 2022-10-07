import './App.css';
import React, { useState } from 'react';


// this a working prototype, lmk if u want stylish frontend
function App () {
  // state variables
  const [input, setValue] = useState("");
  const [weather, setWeather] = useState('');
  const [temp, setTemp] = useState('');
  const [city, setCity] = useState('');
  const [zip, setZip] = useState('');
  const [errorStatus, setStatus]  = useState(true);
  function handleInput(event) {
    setValue(event.target.value);
  }
  // func that does nested api calls
  function API(event) {
    event.preventDefault();
    fetch(`http://api.openweathermap.org/geo/1.0/zip?zip=${input.replace(/\s/g, '')}&appid=384530a26df84465ffe7e9419c8ef8db`, {method : "GET"})
    .then(res => {
      return res.json()
    }).then(data => 
      fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${data.lat}&lon=${data.lon}&appid=384530a26df84465ffe7e9419c8ef8db`,{method : "GET"})
      .then(result => {
        return result.json()
      }).then(data2 =>
        updateWeather(input.replace(/\s/g, ''),data2.main.temp, data2.weather[0].main,data2.name,data2.sys.country)
      )
    )
    .catch(error => setStatus(false))
    setValue("");
  }
  // func that updates weather if successful api call
  function updateWeather(zipCode, newTemp, newWeather, cityName, newCountry) {
    setStatus(true);
    setTemp(newTemp);
    setCity((cityName + ", " + newCountry).toLowerCase());
    setZip(zipCode);
    setWeather(newWeather.toLowerCase());

  }
  // conditional for errors
  return (
    <div className = "container">
      <section className="hero">
    <div className="hero-body">
      <p className="title">
      Want to know the weather?
      </p>
      <p className="subtitle">
        Try me!
      </p>
    </div>
      </section>
    <div className = "container">
      {errorStatus ?
        <div className = "box">
        <h1>
          weather: <span>{weather}</span>   
        </h1>
        <h1>
          temperature: <span>{temp}</span>   
        </h1>
        <h1>
          zip code: <span>{zip}</span>   
        </h1>
        <h1>
          area: <span>{city}</span>   
        </h1>
      </div>
      :
      <div className = "box">
      There's an error! Make sure that you are inputting a valid zipcode.
      </div>
      }
      
        
          <div>
            <input type="text" value={input} placeholder = "input a zip code!" onChange={handleInput} className="input"/>
          </div>
          <div>
            <button onClick={API} className="button is-dark">Search!</button>
          </div>
      
    </div>
    </div>
  )
}
export default App;
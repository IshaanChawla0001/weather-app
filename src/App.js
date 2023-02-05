import "./App.css";
import { useState, useEffect } from "react";
import axios from "axios";
import cloud from "./icons/cloud.png";
import cloudRain from "./icons/cloudRain.png";
import cloudSun from "./icons/cloudSun.png";
import rain from "./icons/rain.png";
import snow from "./icons/snow.png";
import logo from "./icons/logo.png";

function App() {
  const apiKey = "9bf4a4dbddbfd8e2442b49fda8e7cdfe";
  const [data, setData] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [userInput, setuserInput] = useState("");
  const [dataContent, setdataContent] = useState("");

  const contentData = function (data) {
    if (data.length === 0) {
      return (
        <div className="noData">
          <h2>⛔ No Data Available!</h2>
          <p>This can happen due to API error</p>
          <p>Plase try again!</p>
        </div>
      );
    } else {
      return (
        <div className="result">
          <h2 className="headings">{`City: ${data.name},${data.sys.country}`}</h2>
          <h3 className="headings">{data.weather[0].main}</h3>
          <div className="coordinates">
            <h3>{`Lat:${data.coord.lat} Lon:${data.coord.lon}`}</h3>
          </div>
          <img className="img-weather" src={cloud}></img>

          <div className="info1">
            <div>
              <h3>{`Temperature`}</h3>
              <p>{data.main.temp}&deg;F</p>
            </div>

            <div>
              <h3>{`Feels Like`}</h3>
              <p>{data.main.feels_like}&deg;F</p>
            </div>
          </div>

          <div className="info1">
            <div>
              <h3>{`Temp Max`}</h3>
              <p>{data.main.temp_max}&deg;F</p>
            </div>

            <div>
              <h3>{`Temp Min`}</h3>
              <p>{data.main.temp_min}&deg;F</p>
            </div>
          </div>

          <div className="info1">
            <div>
              <h3>{`Humidity`}</h3>
              <p>{data.main.humidity}%</p>
            </div>

            <div>
              <h3>{`Pressure`}</h3>
              <p>{data.main.pressure}&#13184;</p>
            </div>
          </div>
          <div className="info1">
            <div>
              <h3>{`Wind Speed`}</h3>
              <p>{data.wind.speed}mph</p>
            </div>

            <div>
              <h3>{`Wind Angle`}</h3>
              <p>{data.wind.deg}&deg;</p>
            </div>
          </div>
        </div>
      );
    }
  };

  const displayError = function (error) {
    return (
      <div className="errorData">
        <h2>❌</h2>
        <p>404: City Not Found!</p>
      </div>
    );
  };

  const handleSearch = function () {
    if (userInput === "") {
      return alert("Please type a valid location!");
    }
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?q=${userInput}&units=imperial&appid=${apiKey}`
      )
      .then((response) => {
        setData(response.data);
        // console.log(response.data);
        // const content = contentData(data);
        // setdataContent(content);
        // console.log(content);
      })
      .catch(function (error) {
        console.log(error);
        // console.log(error.response.data.cod);
        // console.log(error.response.data.message);
        // Request failed with status code 404 and message city not found
        setErrorMessage([error.response.data.cod, error.response.data.message]);
        console.log(errorMessage);
      })
      .finally(() => {
        const content = contentData(data);
        setdataContent(content);
        console.log(content);
      });
    console.log(userInput);
    setuserInput("");
  };

  return (
    <div className="App">
      <div
        onClick={() => {
          window.location.reload();
        }}
        className="logo"
      >
        <img src={logo} className="logo-img"></img>
        <h1>The Weather App</h1>
      </div>
      <div className="search">
        <input
          className="user-input"
          value={userInput}
          type="text"
          placeholder="Type your location here..."
          onChange={(event) => {
            setuserInput(event.target.value);
          }}
        ></input>
        <button className="search-btn" onClick={() => handleSearch()}>
          Search
        </button>
      </div>

      {dataContent}
    </div>
  );
}

export default App;

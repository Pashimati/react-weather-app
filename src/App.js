import './App.css';
import Search from "./components/search/Search";
import CurrentWeather from "./components/current-weather/Current-weather";
import {WEATHER_API_URL, WEATHER_API_KEY} from "./components/api";
import {useState} from "react";

function App() {

    const [currentWeather, SetCurrentWeather] = useState(null);
    const [forecast, SetForecast] = useState(null);

    const handleOnSearchChange = (searchData) => {
       const [lat, lon] = searchData.value.split(" ");

       const currentWeatherFetch = fetch(`${WEATHER_API_URL}/weather?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}`);

       const forecastFetch = fetch(`${WEATHER_API_URL}/forecast?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}`);

       Promise.all([currentWeatherFetch, forecastFetch])
           .then(async (response) => {
               const weatherResponse = await response[0].json();
               const forecastResponse = await response[1].json();

               SetCurrentWeather({ city: searchData.label, ...weatherResponse});
               SetForecast({city: searchData.label,...forecastResponse})
           })
           .catch((err) => console.log(err));
    }

    console.log(currentWeather, forecast)

  return (
    <div className="container">
      <Search onSearchChange={handleOnSearchChange}/>
      <CurrentWeather/>
    </div>
  );
}

export default App;

import WEATHER_API_KEY from './apikey.js';
const searchForm = document.querySelector('.search-form');
const inputData = document.getElementById('disp');
const locationName = document.getElementsByClassName('city')[0];
const locationTemp = document.getElementsByClassName('temp-reading')[0];
const locationHawa = document.getElementsByClassName('wind-data')[0];
const locationHumid = document.getElementsByClassName('humid-data')[0];
const locationImg = document.getElementsByClassName('weather-img')[0];
let cityName;

searchForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  // console.log(inputData.value);
  // console.log(e);
  cityName = inputData.value;
  inputData.value = '';
  if (cityName) {
    const InfoObj = { ...(await weatherInfo()) };
    // console.log(InfoObj);
    changeInfo(InfoObj);
  }
});

const weatherInfo = async () => {
  const weatherData = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${WEATHER_API_KEY}&units=metric`
  );
  console.log(weatherData);
  if (weatherData.status === 200) {
    const weatherDeets = weatherData.json();
    const weatherDesc = await weatherDeets;
    console.log(weatherDesc);
    const myObj = {
      name: weatherDesc.name,
      temp: weatherDesc.main.temp,
      humid: weatherDesc.main.humidity,
      type: weatherDesc.weather[0].main,
      wind: weatherDesc.wind.speed,
    };
    return myObj;
    // weatherDesc.name, weatherDesc.main.temp, weatherDesc.main.humidity, weatherDesc.weather[0].main, weatherDesc.wind.speed
  }
  return;
};

const changeInfo = (theObj) => {
  locationName.innerHTML = theObj.name;
  locationTemp.innerHTML = Math.round(theObj.temp);
  locationTemp.innerHTML += '℃';
  locationHawa.innerHTML = 'Wind : ' + theObj.wind + 'km/h';
  locationHawa.style.fontWeight = '600';
  locationHumid.innerHTML = 'Humidity : ' + theObj.humid + '%';
  locationHumid.style.fontWeight = '600';
  return;
};

// weatherInfo();

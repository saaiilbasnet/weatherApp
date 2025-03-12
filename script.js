
const API_KEY ="4f42a8122e24761f3e97ab3c8a939288";
const searchData = document.getElementById("search-box");
const weatherDataEl = document.getElementById("weather-data");
const btnEl = document.getElementById("btn");

const formEl = document.querySelector("form")

async function getWeatherinfo(cityName){
    try{
        const response = await fetch( `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${API_KEY}&units=metric`);

        if (!response.ok){
            throw new Error("Network response was not ok.");
        }
    
        const data = await response.json();
        const temperature = Math.round(data.main.temp);
        const description = data.weather[0].description;
        const icon = data.weather[0].icon;

        const details = [
            `Feels like ${Math.round(data.main.feels_like)}°C`,
            `Humidity : ${data.main.humidity}%`,
            `Wind Speed : ${data.wind.speed} m/s`
        ];

        weatherDataEl.querySelector(
            ".icon"
          ).innerHTML = `<img src="http://openweathermap.org/img/wn/${icon}.png" alt="Weather Icon">`;

          weatherDataEl.querySelector(".temperature").textContent = `${temperature}°C`;

          weatherDataEl.querySelector(".description").textContent = description;

          weatherDataEl.querySelector(".details").innerHTML = details.map((detail)=>
            `<div>${detail}</div>`
          ).join("");

    }

    catch(error){
        weatherDataEl.querySelector(".icon").innerHTML = "";
        weatherDataEl.querySelector(".temperature").textContent = "";
        weatherDataEl.querySelector(".description").textContent =
          "An error happened, please try again later";
    
        weatherDataEl.querySelector(".details").innerHTML = "";
    }
    
}

btnEl.addEventListener("click",(e)=>{
 e.preventDefault();
 const cityName = searchData.value;
 getWeatherinfo(cityName);
});


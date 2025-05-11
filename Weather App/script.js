const inputBox = document.querySelector('.input-box');
const searchBtn = document.getElementById('searchBtn');
const weather_img = document.querySelector('.weather-img');
const temperature = document.querySelector('.temperature');
const description = document.querySelector('.description');
const humidity = document.getElementById('humidity');
const wind_speed = document.getElementById('wind-speed');
const location_not_found = document.querySelector('.location-not-found');

const weather_body = document.querySelector('.weather-body');

async function checkWeather(city) {
    const api_key = "3c4a2820bfa8782e818cd79f33cf1e0a";
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api_key}&units=metric`;

    const weather_data = await fetch(url).then(response => response.json());

    //  error 404
    if (weather_data.cod === `404`) {
        location_not_found.style.display = 'flex';
        weather_body.style.display = "none";
        console.log("error");
        return;
    }
    weather_body.style.display = "flex";

    // Temperature
    temperature.innerHTML = `${Math.round(weather_data.main.temp)}°C`;

    // Description
    description.innerHTML = `${weather_data.weather[0].description}%`;

    //Humidity
    humidity.innerHTML = `${weather_data.main.humidity}%`;

    // Wind Speed
    wind_speed.innerHTML = `${weather_data.wind.speed}Km/H`;

    switch (weather_data.weather[0].main) {
        case 'Clouds':
            weather_img.src = "assets/cloud.webp";
            break;

        case 'Clear':
            weather_img.src = "assets/clear.webp";
            break;

        case 'Rain':
            weather_img.src = "assets/rain.webp";
            break;

        case 'Mist':
            weather_img.src = "assets/mist.webp";
            break;

        case 'Snow':
            weather_img.src = "assets/snow.webp";
            break;
    }


    //console.log(weather_data);
}

searchBtn.addEventListener('click', () => {
    checkWeather(inputBox.value);
});

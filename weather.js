const currentWeather = document.querySelector("#btn-localWeather");
const searchWeather = document.querySelector("#btn-searchWeather");
const flag = document.querySelector(".country-flag");
const placeName = document.querySelector(".location-name");
let dataWeather = "";
const weatherDescription = document.querySelector(".weather-condition");
const weatherImg = document.querySelector(".weather-img");
const temp = document.querySelector(".temp");
const windspeed = document.querySelector(".windspeed-info");
const humidity = document.querySelector(".humidity-info");
const cloud = document.querySelector(".clouds-info");

const accessLocation = document.querySelector("#grantAcessDiv");
const mainInfo = document.querySelector("#data-weatherDetails");
const loading = document.querySelector("#loadingGif");
const searchBar = document.querySelector("#search-bar");
const searchBox = document.querySelector("#search-box");
const searchBtn = document.querySelector("#search-btn");
const error = document.querySelector("#errorDiv");

const API_KEY = "3c894ac1c5f8a1dbb6ec8e4227b892da";
let city = "";

initialCheck(); // caliing when program started
// at starting if initial check was successful it will show the weather of corrdiates stored
// in browser otherwise access location page will appear

function initialCheck(){
    if(sessionStorage.latitude && sessionStorage.longitude){
        accessLocation.style.display = "none";
        showCustomWeather();
    }
    
}

async function showCustomWeather(){
    try{
        loading.style.display = "block";
        let latitude = sessionStorage.latitude;
        let longitude = sessionStorage.longitude;
        const result = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}`)
        dataWeather = await result.json();
        console.log("Weather data(in JSON format):-> " , dataWeather);
        setWeatherDetails();
        loading.style.display = "none";
        mainInfo.style.display = "block";
        // renderWeatherDetails(data);
    }catch(e){
        console.log('The Error is: ',e);
    }
};

function setWeatherDetails(){
    placeName.innerText  = dataWeather.name;
    let code = dataWeather.sys.country;
    let codeInLowerCase = code.toLowerCase();
    flag.setAttribute("src",`https://flagcdn.com/16x12/${codeInLowerCase}.png`);
    weatherDescription.innerText = dataWeather.weather[0].description;
    let weatherConditionIcon = dataWeather.weather[0].icon;
    weatherImg.setAttribute("src",`https://openweathermap.org/img/wn/${weatherConditionIcon}@2x.png`);
    temp.innerText = dataWeather.main.temp + " °C";
    windspeed.innerText = dataWeather.wind.speed + " m/s";
    humidity.innerText = dataWeather.main.humidity + " %";
    cloud.innerText = dataWeather.clouds.all + " %";

}

async function showWeatherCity(city){
    try{
        error.style.display = "none";
        loading.style.display = "block";
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`);
        dataWeather = await response.json();
        console.log("Weather data:-> " , dataWeather);
        setWeatherDetails();
        loading.style.display = "none";
        mainInfo.style.display = "block";
    }
    catch(e){
        console.log('Error is: ',e);
        loading.style.display = "none";
        error.style.display = "block";
    }
}

searchBar.addEventListener("submit", (e) => {
    e.preventDefault();
    let cityName = searchBox.value; 

    if(cityName === "")
        return;
    else 
        showWeatherCity(cityName);
})

function getLocation() {
    if(navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    }
    else {
        console.log("No geoLocation Support");
    }
}

function showPosition(position) {
    let latitude = position.coords.latitude;
    let longitude = position.coords.longitude;

    sessionStorage.latitude = latitude;
    sessionStorage.longitude = longitude;
    accessLocation.style.display = "none";
    showCustomWeather();
}


function switchToCurrentWeather(){
    currentWeather.classList.add("colorSwitch");
    searchWeather.classList.remove("colorSwitch");
    error.style.display = "none";
    searchBar.style.display = "none";
    mainInfo.style.display = "none";
    accessLocation.style.display = "block";
    initialCheck();
}

function switchToSearchWeather(){
    currentWeather.classList.remove("colorSwitch");
    searchWeather.classList.add("colorSwitch");
    error.style.display = "none";
    accessLocation.style.display = "none";
    mainInfo.style.display = "none";
    searchBar.style.display = "block";
}






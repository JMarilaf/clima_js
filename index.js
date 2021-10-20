const API_KEY = '98a5403819a80eae71a1394e1d0e4fed';

let iconoClima = document.getElementById('image-icon');

const fetchData = position => {

    const { latitude, longitude } = position.coords;

    fetch(`https://api.openweathermap.org/data/2.5/weather?lang=es&units=metric&lat=${latitude}&lon=${longitude}&appid=${API_KEY}`)
        .then(response => response.json())
        .then(data => setWeatherData(data));
}

const setWeatherData = data => {
    console.log(data);
    const weatherData = {
        description: `${data.weather[0].description}`,
        tempMax: `${data.main.temp_max} °C`,
        location: `${data.name}`,
        tempMin: `${data.main.temp_min} °C`,
        temperature: `${data.main.temp} °C`,
        pressure: `${data.main.temp} mb`,
        wind: `${data.wind.speed} m/s`,
        humidity: `${data.main.humidity}%`,
        date: `${getDate()}`,
    }

    Object.keys(weatherData).forEach( key => {
        document.getElementById(key).textContent = weatherData[key];
    });

    let mainDescription = data.weather[0].main;

    const ICON_WEATHER = {
        'Thunderstorm': () => iconoClima.src = 'animated/thunderstorm.svg',
        'Drizzle': () => iconoClima.src = 'animated/scattered-clouds.svg',
        'Rain': () => iconoClima.src = 'animated/rain.svg',
        'Snow': () => iconoClima.src = 'animates/snow.svg',
        'Clear': () => iconoClima.src = 'animated/clear-sky-day.svg',
        'Clouds': () => iconoClima.src = 'animated/few clouds-day.svg'
    }

    const a = ICON_WEATHER[mainDescription]
        ? ICON_WEATHER[mainDescription]()
        : iconoClima.src = 'animated/mist.svg'

}

const getDate = () => {
    let date = new Date();
    return `${date.getDate()}-${ ( '0' + (date.getMonth() + 1)).slice(-2)  }-${date.getFullYear()}`;
}

const onLoad = () => {
    navigator.geolocation.getCurrentPosition(fetchData);
}
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

    let iconCode = data.weather[0].icon;

    //Mostrar iconos animados en carpeta local
    switch (iconCode) {
        case '01d':
            iconoClima.src = 'animated/clear-sky-day.svg'
        break;
        case '01n':
            iconoClima.src = 'animated/clear-sky-night.svg'
        break;
        case '02d':
            iconoClima.src = 'animated/few-clouds-day.svg'
        break;
        case '02n':
            iconoClima.src = 'animates/few-clouds-day.svg'
        break;
        case '03d':
        case '03n':
            iconoClima.src = 'animated/scattered-clouds'
        break;
        case '04d':
        case '04n':
            iconoClima.src = 'animated/broken-clouds.svg'
        break;
        case '09d':
        case '09n':
        case '10d':
        case '10n':
            iconoClima.src = 'animated/rain.svg'
        break;
        case '11d':
        case '11n':
            iconoClima.src = 'animated/thunderston.svg'
        break;
        default:
            iconoClima.src = 'animated/mist.png'
    }

    //Mostrar icono utilizando api de "openweather"
    // const urlIcon = `http://openweathermap.org/img/wn/${iconCode}.png`;
    // iconoClima.src = urlIcon;
}

const getDate = () => {
    let date = new Date();
    return `${date.getDate()}-${ ( '0' + (date.getMonth() + 1)).slice(-2)  }-${date.getFullYear()}`;
}

const onLoad = () => {
    navigator.geolocation.getCurrentPosition(fetchData);
}
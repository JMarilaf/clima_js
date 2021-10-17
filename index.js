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
        description: `Tiempo: ${data.weather[0].description}`,
        tempMax: `Temperatura máxima: ${data.main.temp_max} °C`,
        location: `Ciudad: ${data.name}`,
        //Icono
        tempMin: `Temperatura mínima: ${data.main.temp_min} °C`,
        temperature: `Temperatura actual: ${data.main.temp} °C`,
        pressure: `Presión: ${data.main.temp} mb`,
        wind: `Velocidad del viento: ${data.wind.speed} m/s`,
        humidity: `Humedad: ${data.main.humidity}%`,
        date: `Fecha: ${getDate()}`,
    }

    Object.keys(weatherData).forEach( key => {
        document.getElementById(key).textContent = weatherData[key];
    });

    //Mostrar icono
    let iconCode = data.weather[0].icon;
    const urlIcon = `http://openweathermap.org/img/wn/${iconCode}.png`;
    iconoClima.src = urlIcon;
}

const getDate = () => {
    let date = new Date();
    return `${date.getDate()}-${ ( '0' + (date.getMonth() + 1)).slice(-2)  }-${date.getFullYear()}`;
}

const onLoad = () => {
    navigator.geolocation.getCurrentPosition(fetchData);
}


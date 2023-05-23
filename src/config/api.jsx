//const apiKey = "";
export const apiURL = (city, isFahrenheit=false) => {

    return `https://api.openweathermap.org/data/2.5/weather
    ?appid=${process.env.REACT_APP_API_KEY}
    &units=${(isFahrenheit ? 'imperial' : 'metric')}
    &q=${city}`
}
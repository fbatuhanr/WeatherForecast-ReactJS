export const apiURL = (city, isFahrenheit=false) => `https://api.openweathermap.org/data/2.5/weather?appid=${process.env.REACT_APP_API_KEY}&units=${(isFahrenheit ? 'imperial' : 'metric')}&q=${city}`

export const cityApiURL = ``;
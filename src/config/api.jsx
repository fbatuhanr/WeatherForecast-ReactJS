export const weatherApiURL = (city, isFahrenheit=false) => `https://api.openweathermap.org/data/2.5/weather?appid=${process.env.REACT_APP_OPENWEATHERMAP_API_KEY}&units=${(isFahrenheit ? 'imperial' : 'metric')}&q=${city}`


export const cityApiUrlHeaders = {headers: {'X-RapidAPI-Key': process.env.REACT_APP_GEODBCITIES_API_KEY, 'X-RapidAPI-Host': 'wft-geo-db.p.rapidapi.com'}};
export const cityApiURL = (cityPrefix) => `https://wft-geo-db.p.rapidapi.com/v1/geo/cities?limit=5&offset=0&namePrefix=${cityPrefix}&minPopulation=25000&sort=-population`;
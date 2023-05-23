const apiKey = "f2174d0ca49ab1012b879612d436c67a";
export const apiURL = (city, isFahrenheit=false) => {

    return "https://api.openweathermap.org/data/2.5/weather"
        + "?appid=" + apiKey
        + "&units=" + (isFahrenheit ? "imperial" : "metric")
        + "&q=" + city
}
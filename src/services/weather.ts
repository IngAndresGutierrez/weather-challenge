import axios from 'axios'

const API_KEY = 'c6fc2d33595fa196f094bdefb5c864c9'

export const getWeatherService = (city:string) => {
  return axios.get(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&APPID=${API_KEY}`
  )
}

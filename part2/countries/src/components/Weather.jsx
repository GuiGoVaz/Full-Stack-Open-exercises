import axios from "axios"
import { useState } from "react"

const Weather = ({ capital }) => {
    const [main, setNewMain] = useState(null)
    const [wind, setNewWind] = useState('')
    const [icon, setNewIcon] = useState('')
    const api_key = import.meta.env.VITE_WEATHER_KEY
    const URL = `https://api.openweathermap.org/data/2.5/weather`

    axios.get(URL, {
        params: {
            q: String(capital),
            appid: api_key,
            units: 'metric'
        }
    })
        .then(response => {
            const data = response.data;
            setNewMain(data.main)
            setNewWind(data.wind)
            setNewIcon(data.weather[0].icon)
        })

    if (!main) { return null }
    const Icon_URL = `https://openweathermap.org/img/wn/${icon}@2x.png`
    return (<div>
        <h2>Weather in {capital}</h2>
        <p>Temperature {main.temp} Celsius</p>
        <img src={Icon_URL} alt="Weather icon" ></img>
        <p>Wind {wind.speed} m/s</p>
    </div>)
}

export default Weather
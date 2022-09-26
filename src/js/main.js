const apiKey = {
  weatherApi: 'd65a3c03ce05ba6beb52323cc4b4221a',
  countryApi: 'https://countryflagsapi.com/png/',
  weatherIcon: 'https://openweathermap.org/img/wn/'
}

const cityInput = document.querySelector('#city-input')
const searchBtn = document.querySelector('#search')
const body = document.body

const cityElement = document.querySelector('#city')
const tempElement = document.querySelector('#temperature span')
const descElement = document.querySelector('#description')
const weatherIconElement = document.querySelector('#weather-icon')
const countryElement = document.querySelector('#country')
const umidityElement = document.querySelector('#umidity span')
const windElement = document.querySelector('#wind span')

const weatherContainer = document.querySelector("#weather-data")

const getWeatherData = async city => {
  const apiWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey.weatherApi}&lang=pt_br`

  const res = await fetch(apiWeatherUrl)
  const data = await res.json()
  return data
}

const showWeatherData = async city => {
  const data = await getWeatherData(city)

  cityElement.innerText = data.name
  tempElement.innerText = parseInt(data.main.temp)
  descElement.innerText = data.weather[0].description
  weatherIconElement.setAttribute(
    'src',
    `${apiKey.weatherIcon}${data.weather[0].icon}.png`
  )
  countryElement.setAttribute('src', `${apiKey.countryApi}${data.sys.country}`)
  umidityElement.innerText = `${data.main.humidity}%`
  windElement.innerText = `${data.wind.speed}Km/h`

  weatherContainer.classList.remove("hide")
}

searchBtn.addEventListener('click', e => {
  e.preventDefault()
  const city = cityInput.value
  showWeatherData(city)
})


cityInput.addEventListener("keyup", (e) => {
  e.preventDefault()
  if(e.code === "Enter") {
    const city = e.target.value
    showWeatherData(city)
  }
})

// console.log(apiKey)

getWeatherData('Donetsk')

function getWeatherData(place) {
    const API_KEY = '8c93761f0cfd02f56a37c775dc01adf7'
    const API_URL = `https://api.openweathermap.org/data/2.5/weather?units=metric&appid=${API_KEY}&q=${place}`
    fetch(API_URL)
        .then(response => response.json())
        .then(data => {
            renderWidget(data)
        })
        .catch((err) => {
            console.error(err)
        })
}

function renderWidget(data) {
    const widgetContainer = document.querySelector('.weatherWidget')
    const monthArray = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']
    const now = new Date()
    const weatherData = data.weather[0]
    const tempData = data.main
    const windData = data.wind
    widgetContainer.innerHTML = `
            <div class="weatherWidget-header">
                <div class="weatherWidget-header__place">
                    <h2>${data.name}</h2>               
                </div>
                <button class="weatherWidget-header__refresh"></button>
            </div>
            <div class="weatherWidget-body">
                <div class="weatherWidget-body__icon">
                    <img src="http://openweathermap.org/img/wn/${weatherData.icon}@4x.png" alt="">
                </div>
                <div class="weatherWidget-body__info">
                    <div class="weatherWidget-body__temperature">
                        ${Math.round(tempData.temp)}&#176;C
                    </div>
                    <div class="weatherWidget-body__forecast">
                        <h2>${weatherData.main}</h2>
                        <h4>${weatherData.description}</h4>
                    </div>
                    <div class="weatherWidget-body__date">
                        <div>${monthArray[now.getMonth()]}</div>
                        ${now.getDate()}
                    </div>
                </div>
            </div>
            <div class="weatherWidget-footer">
                <div class="weatherWidget-footer__wind">
                    <i class="icon" style="transform: rotate(${windData.deg}deg)"></i>
                    <span>${windData.speed}m/s</span>
                </div>
                <div class="weatherWidget-footer__humidity">
                    <i class="icon"></i>
                    <span>${tempData.humidity}%</span>
                </div>
                <div class="weatherWidget-footer__realfeel">
                    <p>Real Feel</p>
                    <span>${Math.round(tempData.feels_like)}&#176;C</span>
                </div>
            </div>
        </div>`

    const refreshButton = widgetContainer.querySelector('.weatherWidget-header__refresh')
    refreshButton.onclick = function(e) {
        getWeatherData('Donetsk')
    }
}
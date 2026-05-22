// Väderapp

const apiKey = "36587143dbc03301e839d6041abc3b40";

const form = document.getElementById("search-form");
const input = document.getElementById("city-input");

form.addEventListener("submit", function(e) {
    e.preventDefault();
    const city = input.value;
    if (city != "") {
        getWeather(city);
        getForecast(city);
    }
});

function getWeather(city) {
    document.getElementById("loading").classList.remove("d-none");
    document.getElementById("error-message").classList.add("d-none");

    let url = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=metric&lang=sv&appid=" + apiKey;

    fetch(url)
        .then(function(response) {
            if (!response.ok) {
                throw new Error("Hittade inte staden");
            }
            return response.json();
        })
        .then(function(data) {
            showWeather(data);
        })
        .catch(function(error) {
            showError(error.message);
        });
}

function getForecast(city) {
    let url = "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&units=metric&lang=sv&appid=" + apiKey;

    fetch(url)
        .then(function(response) {
            return response.json();
        })
        .then(function(data) {
            showForecast(data);
        });
}

function showWeather(data) {
    document.getElementById("loading").classList.add("d-none");
    document.getElementById("city-name").textContent = data.name;
    document.getElementById("country").textContent = data.sys.country;
    document.getElementById("temperature").textContent = Math.round(data.main.temp) + "°C";
    document.getElementById("description").textContent = data.weather[0].description;
    document.getElementById("feels-like").textContent = Math.round(data.main.feels_like) + "°C";
    document.getElementById("humidity").textContent = data.main.humidity + "%";
    document.getElementById("wind-speed").textContent = data.wind.speed + " m/s";

    const icon = data.weather[0].icon;
    document.getElementById("weather-icon").src = "https://openweathermap.org/img/wn/" + icon + "@2x.png";

    document.getElementById("weather-result").classList.remove("d-none");
}

function showForecast(data) {
    const cards = document.getElementById("forecast-cards");
    cards.innerHTML = "";

    // ta bara en prognos per dag (kl 12)
    const days = data.list.filter(function(item) {
        return item.dt_txt.includes("12:00:00");
    });

    const dayNames = ["Sön", "Mån", "Tis", "Ons", "Tor", "Fre", "Lör"];

    for (let i = 0; i < days.length; i++) {
        const day = days[i];
        const date = new Date(day.dt * 1000);
        const name = dayNames[date.getDay()];
        const temp = Math.round(day.main.temp);
        const icon = day.weather[0].icon;

        cards.innerHTML += `
            <div class="col-6 col-md">
                <div class="forecast-card shadow-sm">
                    <p class="day-name mb-1">${name}</p>
                    <img src="https://openweathermap.org/img/wn/${icon}@2x.png">
                    <p class="temp mb-0">${temp}°C</p>
                </div>
            </div>
        `;
    }

    document.getElementById("forecast-section").classList.remove("d-none");
}

function showError(msg) {
    document.getElementById("loading").classList.add("d-none");
    document.getElementById("weather-result").classList.add("d-none");
    document.getElementById("forecast-section").classList.add("d-none");
    document.getElementById("error-text").textContent = msg;
    document.getElementById("error-message").classList.remove("d-none");
}

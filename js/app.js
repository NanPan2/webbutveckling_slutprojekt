// ==============================
// VäderKollen - JavaScript
// ==============================

// API-nyckel från OpenWeatherMap (gratis konto)
// OBS: Byt ut mot din egen nyckel från https://openweathermap.org/api
const API_KEY = "din_api_nyckel_här";
const BASE_URL = "https://api.openweathermap.org/data/2.5";

// DOM-element
const searchForm = document.getElementById("search-form");
const cityInput = document.getElementById("city-input");
const loadingSection = document.getElementById("loading");
const errorSection = document.getElementById("error-message");
const errorText = document.getElementById("error-text");
const weatherResult = document.getElementById("weather-result");
const forecastSection = document.getElementById("forecast-section");

// Event Listener - Lyssna på formuläret
searchForm.addEventListener("submit", function (event) {
    event.preventDefault(); // Förhindra sidladdning
    const city = cityInput.value.trim();

    if (city) {
        fetchWeather(city);
    }
});

// Hämta aktuellt väder från API
async function fetchWeather(city) {
    // Visa laddning, dölj andra sektioner
    showLoading();

    try {
        // Hämta aktuellt väder
        const weatherResponse = await fetch(
            `${BASE_URL}/weather?q=${encodeURIComponent(city)}&units=metric&lang=sv&appid=${API_KEY}`
        );

        if (!weatherResponse.ok) {
            if (weatherResponse.status === 404) {
                throw new Error("Staden kunde inte hittas. Kontrollera stavningen och försök igen.");
            } else if (weatherResponse.status === 401) {
                throw new Error("API-nyckeln är ogiltig. Se README för instruktioner.");
            } else {
                throw new Error("Något gick fel. Försök igen senare.");
            }
        }

        const weatherData = await weatherResponse.json();
        displayWeather(weatherData);

        // Hämta 5-dagars prognos
        const forecastResponse = await fetch(
            `${BASE_URL}/forecast?q=${encodeURIComponent(city)}&units=metric&lang=sv&appid=${API_KEY}`
        );

        if (forecastResponse.ok) {
            const forecastData = await forecastResponse.json();
            displayForecast(forecastData);
        }

    } catch (error) {
        showError(error.message);
    }
}

// Visa väderdata på sidan
function displayWeather(data) {
    // Dölj laddning och fel
    hideLoading();
    hideError();

    // Fyll i data
    document.getElementById("city-name").textContent = data.name;
    document.getElementById("country").textContent = getCountryName(data.sys.country);
    document.getElementById("temperature").textContent = `${Math.round(data.main.temp)}°C`;
    document.getElementById("description").textContent = data.weather[0].description;
    document.getElementById("feels-like").textContent = `${Math.round(data.main.feels_like)}°C`;
    document.getElementById("humidity").textContent = `${data.main.humidity}%`;
    document.getElementById("wind-speed").textContent = `${data.wind.speed} m/s`;

    // Sätt väderikon
    const iconCode = data.weather[0].icon;
    const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
    document.getElementById("weather-icon").src = iconUrl;
    document.getElementById("weather-icon").alt = data.weather[0].description;

    // Visa resultat
    weatherResult.classList.remove("d-none");
}

// Visa 5-dagars prognos
function displayForecast(data) {
    const forecastCards = document.getElementById("forecast-cards");
    forecastCards.innerHTML = ""; // Rensa gamla kort

    // Filtrera till en prognos per dag (kl 12:00)
    const dailyForecasts = data.list.filter(function (item) {
        return item.dt_txt.includes("12:00:00");
    });

    // Skapa kort för varje dag (max 5)
    const daysToShow = dailyForecasts.slice(0, 5);

    daysToShow.forEach(function (day) {
        const date = new Date(day.dt * 1000);
        const dayName = getDayName(date);
        const temp = Math.round(day.main.temp);
        const icon = day.weather[0].icon;
        const description = day.weather[0].description;

        const cardHTML = `
            <div class="col-6 col-md">
                <div class="forecast-card shadow-sm">
                    <p class="day-name mb-1">${dayName}</p>
                    <img src="https://openweathermap.org/img/wn/${icon}@2x.png" alt="${description}">
                    <p class="temp mb-0">${temp}°C</p>
                    <small class="text-muted text-capitalize">${description}</small>
                </div>
            </div>
        `;

        forecastCards.innerHTML += cardHTML;
    });

    // Visa prognossektionen
    forecastSection.classList.remove("d-none");
}

// Hjälpfunktioner

function showLoading() {
    loadingSection.classList.remove("d-none");
    weatherResult.classList.add("d-none");
    forecastSection.classList.add("d-none");
    errorSection.classList.add("d-none");
}

function hideLoading() {
    loadingSection.classList.add("d-none");
}

function showError(message) {
    hideLoading();
    weatherResult.classList.add("d-none");
    forecastSection.classList.add("d-none");
    errorText.textContent = message;
    errorSection.classList.remove("d-none");
}

function hideError() {
    errorSection.classList.add("d-none");
}

// Hämta veckodagsnamn på svenska
function getDayName(date) {
    const days = ["Söndag", "Måndag", "Tisdag", "Onsdag", "Torsdag", "Fredag", "Lördag"];
    return days[date.getDay()];
}

// Översätt landskod till landsnamn (vanliga länder)
function getCountryName(code) {
    const countries = {
        SE: "Sverige",
        NO: "Norge",
        DK: "Danmark",
        FI: "Finland",
        DE: "Tyskland",
        GB: "Storbritannien",
        US: "USA",
        FR: "Frankrike",
        ES: "Spanien",
        IT: "Italien",
        JP: "Japan",
        CN: "Kina",
        AU: "Australien",
        CA: "Kanada",
        BR: "Brasilien",
        NL: "Nederländerna",
        PT: "Portugal",
        PL: "Polen",
        RU: "Ryssland",
        IN: "Indien"
    };

    return countries[code] || code;
}

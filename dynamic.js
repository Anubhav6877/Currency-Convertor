const apiKey = "YOUR_API_KEY"; // Replace with your OpenWeather API key

const searchButton = document.getElementById("search-btn");
const cityInput = document.getElementById("city-input");
const cityName = document.getElementById("city-name");
const temp = document.getElementById("temp");
const description = document.getElementById("description");
const humidity = document.getElementById("humidity");
const wind = document.getElementById("wind");

searchButton.addEventListener("click", fetchWeather);

function fetchWeather() {
    const city = cityInput.value;
    if (city) {
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

        fetch(url)
            .then(response => response.json())
            .then(data => {
                if (data.cod === 200) {
                    displayWeather(data);
                } else {
                    alert("City not found. Please try again.");
                }
            })
            .catch(error => console.log("Error fetching weather data:", error));
    } else {
        alert("Please enter a city name");
    }
}

function displayWeather(data) {
    cityName.textContent = data.name;
    temp.textContent = `Temperature: ${data.main.temp}°C`;
    description.textContent = `Description: ${data.weather[0].description}`;
    humidity.textContent = `Humidity: ${data.main.humidity}%`;
    wind.textContent = `Wind Speed: ${data.wind.speed} m/s`;
}
// Conversion rates for simplicity (static data)
const exchangeRates = {
    USD: { EUR: 0.92, INR: 82.5, GBP: 0.75 },
    EUR: { USD: 1.09, INR: 89.5, GBP: 0.82 },
    INR: { USD: 0.012, EUR: 0.011, GBP: 0.0092 },
    GBP: { USD: 1.33, EUR: 1.22, INR: 108.5 }
};

// Function to convert currency
function convertCurrency() {
    const amount = parseFloat(document.getElementById("amount").value);
    const fromCurrency = document.getElementById("from-currency").value;
    const toCurrency = document.getElementById("to-currency").value;

    // Validate input
    if (!amount || amount <= 0) {
        alert("Please enter a valid amount.");
        return;
    }

    if (fromCurrency === toCurrency) {
        document.getElementById("result").innerText = "Converted Amount: " + amount;
        return;
    }

    const rate = exchangeRates[fromCurrency][toCurrency];
    const convertedAmount = amount * rate;

    // Display result
    document.getElementById("result").innerText = "Converted Amount: " + convertedAmount.toFixed(2) + " " + toCurrency;
}

// This file can be used for any JavaScript functionality for the weather app.
const weatherForm = document.querySelector(".weatherForm"); // Selects the weather form element
const cityInput = document.querySelector(".cityInput");     // Selects the city input element
const card = document.querySelector(".card");               // Selects the weather card display element
const apikey = "5a5ed946532d65868127bfb52ece111a";           // API key for OpenWeatherMap

// Event listener for form submission
weatherForm.addEventListener("submit", async event => {
    event.preventDefault(); // Prevents default form submission behavior
    const city = cityInput.value;

    if (city) {
        try {
            // Fetch weather data for the entered city
            const weatherData = await getWeatherData(city);
            displayWeatherInfo(weatherData);
        } catch (error) {
            console.error(error);
            displayError("City not found or API error");
        }
    } else {
        displayError("Please enter a city"); // Display error if no city is entered
    }
});

// Function to fetch weather data from OpenWeatherMap API
async function getWeatherData(city) {
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}`;
    const response = await fetch(apiUrl);

    if (!response.ok) {
        throw new Error("API response not OK"); // Throws error if API response is not OK
    }

    return await response.json();
}

// Function to display weather information on the card
function displayWeatherInfo(data) {
    // Destructure weather data for easier access
    const { name: city, main: { temp, humidity }, weather } = data;
    const { description, id } = weather[0];

    card.textContent = "";         // Clear previous card content
    card.style.display = "flex";   // Display the card

    // Create HTML elements for displaying weather information
    const cityDisplay = document.createElement("h1");
    const tempDisplay = document.createElement("p");
    const humidityDisplay = document.createElement("p");
    const descDisplay = document.createElement("p");
    const weatherEmoji = document.createElement("p");

    // Set text content for each element
    cityDisplay.textContent = city;
    tempDisplay.textContent = `${(temp - 273.15).toFixed(1)}°C`; // Convert temp to Celsius
    humidityDisplay.textContent = `Humidity: ${humidity}%`;
    descDisplay.textContent = description;
    weatherEmoji.textContent = getWeatherEmoji(id);

    // Add CSS classes to elements for styling
    cityDisplay.classList.add("cityDisplay");
    tempDisplay.classList.add("tempDisplay");
    humidityDisplay.classList.add("humidityDisplay");
    descDisplay.classList.add("descDisplay");
    weatherEmoji.classList.add("weatherEmoji");

    // Append elements to the weather card
    card.appendChild(cityDisplay);
    card.appendChild(tempDisplay);
    card.appendChild(humidityDisplay);
    card.appendChild(descDisplay);
    card.appendChild(weatherEmoji);
}

// Function to get weather emoji based on weather ID
function getWeatherEmoji(weatherId) {
    // Assigns an emoji based on weather code ranges

    // Thunderstorm
    if (weatherId >= 200 && weatherId < 300) {
        return "⛈️";
    }
    // Drizzle
    if (weatherId >= 300 && weatherId < 400) {
        return "🌦️";
    }
    // Rain
    if (weatherId >= 500 && weatherId < 600) {
        return "🌧️";
    }
    // Snow
    if (weatherId >= 600 && weatherId < 700) {
        return "❄️";
    }
    // Atmosphere (mist, smoke, haze, etc.)
    if (weatherId >= 700 && weatherId < 800) {
        return "🌫️";
    }
    // Clear
    if (weatherId === 800) {
        return "☀️";
    }
    // Clouds
    if (weatherId > 800 && weatherId < 900) {
        return "☁️";
    }
    // Default emoji if no specific weather ID matches
    return "🌍";
}

// Function to display error messages on the card
function displayError(message) {
    const errorDisplay = document.createElement("p"); // Create a paragraph element for the error
    errorDisplay.textContent = message;
    errorDisplay.classList.add("errorDisplay"); // Add CSS class for styling

    card.textContent = "";         // Clear previous card content
    card.style.display = "flex";   // Display the card
    card.appendChild(errorDisplay); // Append error message to the card
}

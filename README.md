# Weather Forecast

## Overview
The Weather Forecast is a web application that allows users to check the current weather and a 5-day forecast for any city. It also provides the option to use the user's current location.

## Features
- Search for weather by city name
- View current temperature, wind speed, and humidity
- View a 5-day weather forecast
- Save recent search history in a dropdown for easy access
- Use geolocation to fetch weather for the current location

## Setup Instructions

### 1. Clone the Repository
```sh
git clone <repository-url>
cd Weather Forecast
```

### 2. Open the Project
Simply open the `index.html` file in a browser to run the application.

### 3. Configure API Key
This project uses the OpenWeatherMap API. You need to get an API key:
1. Sign up at [OpenWeatherMap](https://openweathermap.org/)
2. Get your API key
3. Replace `'YOUR_API_KEY'` in `index.html` with your actual API key.

### 4. Run the Application
Once the API key is set up, refresh the browser, and you can start searching for weather data!

## Usage
1. Enter a city name and click the "Search" button.
2. Click "Use Current Location" to fetch weather based on geolocation.
3. Recent searches are saved in the dropdown for quick access.
4. Weather data is displayed in an easy-to-read format.

## Technologies Used
- **HTML** (Structure)
- **Tailwind CSS** (Styling)
- **JavaScript** (Logic & API requests)
- **Axios** (Fetching weather data)

## Version Control
This project is managed using Git. Use the following commands to track changes:

```sh
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin <repository-url>
git push -u origin main
```

## License
This project is open-source and free to use.

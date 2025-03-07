const apiKey = '4f941cea53c36dadf186a27751c1e853';
        let recentCities = JSON.parse(localStorage.getItem('recentCities')) || [];
        updateRecentSearches();

        document.getElementById('search-btn').addEventListener('click', () => {
            const city = document.getElementById('city').value;
            if (city) {
                getWeather(city);
                saveRecentCity(city);
            } else {
                alert('Please enter a city name!');
            }
        });

        document.getElementById('location-btn').addEventListener('click', getLocationWeather);
        document.getElementById('recent-searches').addEventListener('change', function() {
            if (this.value) {
                getWeather(this.value);
            }
        });

        function saveRecentCity(city) {
            if (!recentCities.includes(city)) {
                recentCities.unshift(city);
                if (recentCities.length > 5) recentCities.pop();
                localStorage.setItem('recentCities', JSON.stringify(recentCities));
                updateRecentSearches();
            }
        }

        function updateRecentSearches() {
            const dropdown = document.getElementById('recent-searches');
            dropdown.innerHTML = '<option value="">Recent Searches</option>';
            recentCities.forEach(city => {
                const option = document.createElement('option');
                option.value = city;
                option.textContent = city;
                dropdown.appendChild(option);
            });
            dropdown.classList.toggle('hidden', recentCities.length === 0);
        }

        async function getWeather(city) {
            const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
            const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${apiKey}`;
            
            try {
                const response = await axios.get(url);
                displayWeather(response.data);
                const forecastResponse = await axios.get(forecastUrl);
                displayForecast(forecastResponse.data);
            } catch (error) {
                alert('City not found or API error!');
            }
        }

        function displayWeather(data) {
            document.getElementById('weather').classList.remove('hidden');
            document.getElementById('city-name').textContent = `${data.name} (${new Date().toISOString().split('T')[0]})`;
            document.getElementById('temperature').textContent = `Temperature: ${data.main.temp}°C`;
            document.getElementById('wind').textContent = `Wind: ${data.wind.speed} M/S`;
            document.getElementById('humidity').textContent = `Humidity: ${data.main.humidity}%`;
            document.getElementById('weather-icon').src = `https://openweathermap.org/img/wn/${data.weather[0].icon}.png`;
        }

        function displayForecast(data) {
            document.getElementById('forecast').classList.remove('hidden');
            let forecastHTML = '';
            const filteredData = data.list.filter((_, index) => index % 8 === 0).slice(0, 5);
            filteredData.forEach(day => {
                forecastHTML += `
                    <div class="bg-white p-4 rounded-lg shadow-md text-center border border-gray-200">
                        <p class="font-bold">${day.dt_txt.split(' ')[0]}</p>
                        <img src="https://openweathermap.org/img/wn/${day.weather[0].icon}.png" class="mx-auto" alt="weather icon">
                        <p>Temp: ${day.main.temp}°C</p>
                        <p>Wind: ${day.wind.speed} M/S</p>
                        <p>Humidity: ${day.main.humidity}%</p>
                    </div>
                `;
            });
            document.getElementById('forecast').innerHTML = forecastHTML;
        }

        function getLocationWeather() {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(async position => {
                    const { latitude, longitude } = position.coords;
                    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${apiKey}`;
                    const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&units=metric&appid=${apiKey}`;
                    try {
                        const response = await axios.get(url);
                        displayWeather(response.data);
                        const forecastResponse = await axios.get(forecastUrl);
                        displayForecast(forecastResponse.data);
                    } catch (error) {
                        alert('Unable to retrieve weather data!');
                    }
                }, () => {
                    alert('Location access denied or unavailable.');
                });
            } else {
                alert('Geolocation is not supported by this browser.');
            }
        }
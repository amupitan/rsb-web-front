const apiKey = 'c566f249e55ea850a37ab0e587048454';

const units = {
    celsius: 'metric',
    fahrenheit: 'imperial',
    kelvin: '',
}

// returns the weather of a location
export default async function getWeather({ lng, lat }) {
    const path = `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${apiKey}&units=${units.fahrenheit}`;

    try {
        const res = await fetch(path, { method: 'GET', });
        if (res.status !== 200) {
            console.error(res.text());
            return { error: 'An unexpected external error occurred. Please try again later' };
        }

        const result = await res.json();
        if (result.message) {
            // TODO: error analytics log
            console.error(result);
            return { error: 'Cannot fetch weather at the moment' };
        }

        return { temp: result.main.temp, weather: result.weather[0].main.toLowerCase() };

    } catch (err) {
        console.error(err);
        return { error: 'Cannot fetch at the moment' };
    }
}
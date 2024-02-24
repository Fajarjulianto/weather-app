import  { useState } from 'react';

const API_KEY = '39931ed8eb58bdf5a72871c98a44590a';
const url = `http://api.openweathermap.org/data/2.5/weather?q=`;

function App() {
  const [data, setData] = useState({});
  const [location, setLocation] = useState('');
  const [error, setError] = useState('');

  const searchLocation = async (event) => {
    if (event.key === 'Enter') {
      try {
        const response = await fetch(`${url}${location}&appid=${API_KEY}&units=metric`);
        if (!response.ok) {
          throw new Error('Failed to fetch weather data');
        }
        const weatherData = await response.json();
        setData(weatherData);
        setLocation('');
        setError('');
      } catch (error) {
        console.error('Error fetching data:', error);
        setError('Failed to fetch weather data. Please try again.');
      }
    }
  };

  const getWeatherIcon = (icon) => {
    switch (icon) {
      case '01d':
        return './assets/icons/01d.svg';
      case '01n':
        return './assets/icons/01n.svg';
      case '02d':
        return './assets/icons/02d.svg';
      case '02n':
        return './assets/icons/02n.svg';
      case '03d':
        return './assets/icons/03d.svg';
      case '03n':
        return './assets/icons/03d.svg';
      case '04d':
        return './assets/icons/04d.svg';
      case '04n':
        return './assets/icons/04n.svg';
      case '09d':
        return './assets/icons/09d.svg';
      case '09n':
        return './assets/icons/09n.svg';
      case '10d':
        return './assets/icons/10d.svg';
      case '10n':
        return './assets/icons/10n.svg';
      case '11d':
        return './assets/icons/11d.svg';
      case '11n':
        return './assets/icons/11n.svg';
      case '13d':
        return './assets/icons/13d.svg';
      case '13n':
        return './assets/icons/13n.svg';
      case '50d':
        return './assets/icons/50d.svg';
      case '50n':
        return './assets/icons/50n.svg';
      default:
        return './assets/icons/01d.svg';
    }
  };

  return (
    <div className="w-full min-h-screen relative font-poppins bg-gradient-to-r from-sky-300 to-indigo-300">
    <div className="text-center p-4 sm:max-w-[700px] md:max-w-[700px] mx-auto">
      <input
        type="text"
        placeholder="Enter city name"
        className="py-3 px-5 text-lg w-full bg-gray-200 rounded-3xl shadow-md placeholder:text-gray-400 focus:outline-none"
        onChange={(e) => setLocation(e.target.value)}
        value={location}
        onKeyDownCapture={searchLocation}
      />
    </div>

    <div className="text-center">
      {error && <p className="text-red-500">{error}</p>}
      <h1 className="text-5xl font-bold text-gray-700 mt-5">{data.name}</h1>
      {data.main && (
        <div className="mt-4">
          {data.weather && data.weather[0] && data.weather[0].icon && (
            <div className="mt-4 flex justify-center items-center">
              <img
                className="size-[300px]"
                src={getWeatherIcon(data.weather[0].icon)}
                alt="Weather Icon"
              />
            </div>
          )}
          <h1 className="text-7xl text-gray-700">{Math.round(data.main.temp)}°C</h1>
          <p className="text-xl text-gray-700">{data.weather[0].description}</p>
        </div>
      )}
    </div>
    <div className='text-center justify-center flex flex-row gap-3 p-5'>
  {data.main && (
    <div className='flex flex-col items-center size-[95px] bg-slate-200 shadow-md rounded-xl p-2'>
        <img 
        src="./assets/icons/feels-like.svg" 
        alt="feels-like" 
      />
      <p>feels like</p>
      <p>{Math.round(data.main.feels_like)}°C</p>
    </div>
  )}
  <div>
  {data.main && (
    <div className='flex flex-col items-center size-[95px] bg-slate-200 shadow-md rounded-xl p-2'>
        <img 
        src="./assets/icons/humidity.svg" 
        alt="humidity" 
      />
      <p>Humidity</p>
      <p>{data.main.humidity}°C</p>
    </div>
  )}
  </div>
  <div>
  {data.wind && ( 
    <div className='flex flex-col items-center size-[95px] bg-slate-200 shadow-md rounded-xl p-2'>
      <img 
        src="./assets/icons/wind.svg" 
        alt="wind" 
      />
      <p>Wind</p>
      <p>{Math.round(data.wind.speed)} km/h</p>
    </div>
  )}
</div>

</div>
</div>
  )
}

export default App;

const container = document.querySelector('.container');
const search = document.querySelector('.search-box button');
const weatherBox = document.querySelector('.weather-box');
const weatherDetails = document.querySelector('.weather-details');
const error404 = document.querySelector('.not-found');
const cityHide = document.querySelector('.city-hide');

search.addEventListener('click',() =>{
  const APIKey = '3f8f537fc7e3549d61384351c36d4675';
  const city = document.querySelector('.search-box input').value;

  if(city == '')
    return;
  fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIKey}`).then(Response => Response.json()).then(json =>{ 

    if (json.cod == '404') {
      container.style.height = '400px';
      weatherBox.classList.remove('active');
      weatherDetails.classList.remove('active');
      error404.classList.add('active');
      return
    }
    container.style.height = '555px';
    weatherBox.classList.add('active');
    weatherDetails.classList.add('active');
    error404.classList.remove('active');

    const image = document.querySelector('.weather-box img');
    const temperature = document.querySelector('.weather-box .temperature');
    const description = document.querySelector('.weather-box .description');
    const humidity = document.querySelector('.weather-details .humidity span');
    const wind = document.querySelector('.weather-details .wind span');
    switch (json.weather[0].main) {
      case 'Clear':
        image.src = 'clear.png';
        break;

      case 'rain':
        image.src = 'rain.png';
        break;

      case 'Snow':
        image.src = 'snow.png';
        break;

      case 'Clouds':
        image.src = 'cloud.png';
        break;
      case 'Clear':
        image.src = 'clear.png';
        break;
      case 'Mist':
        image.src = 'mist.png';
        break;
      case 'Haze':
        image.src = 'haze.webp';
        break;
      default:
        image.src = 'cloud.png';
    }

    temperature.innerHTML = `${parseInt(json.main.temp)}<span>°C</span>`;
    description.innerHTML = `${json.weather[0].description}`;
    humidity.innerHTML = `${json.main.humidity}%`;
    wind.innerHTML = `${parseInt(json.wind.speed)}Km/h`;
  });
});
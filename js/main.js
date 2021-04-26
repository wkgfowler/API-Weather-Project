const APIKey = "(insert API Key here)"

const getdata = async (city) => {
    let response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${APIKey}`)
    console.log(response)
    return response.data
}

const getweatherstatus = async (city) => {
    let response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${APIKey}`)
    console.log(response)
    return response.data.weather[0]['icon']
}

const DOM_ELEMENTS ={
    weather_info: '.weather-info',
    image_source: '.image-source'
}

const load_data = async () => {
    clear_data()
    let city_name = document.getElementById('city').value

    const weather = await getdata(city_name);
    const weather_status = await getweatherstatus(city_name);
    
    weather_photo(weather_status)
    create_info(weather.name, KtoF(weather.main['temp']), KtoF(weather.main['temp_max']), KtoF(weather.main['temp_min']), weather.weather[0]['description'], weather.main['humidity'])

    console.log(weather_status)
}

const create_info = (city, current, high, low, forecast, humidity) => {
    const html = `<h1>${city}</h1><br>
    <h3>Current Temp</h3><br><h3>${current}\xB0</h3><br>
    <h3>High</h3><br><h3>${high}\xB0</h3><br>
    <h3>Low</h3><br><h3>${low}\xB0</h3><br>
    <h3>Forecast</h3><br><h3>${forecast}</h3><br>
    <h3>Humidity</h3><br><h3>${humidity}%</h3>`;
    document.querySelector(DOM_ELEMENTS.weather_info).insertAdjacentHTML('beforeend', html)
}

const clear_data = () => {
    document.querySelector(DOM_ELEMENTS.weather_info).innerHTML = ''
    document.querySelector(DOM_ELEMENTS.image_source).innerHTML = ''
}

const weather_photo = (icon) => {
    console.log(icon)
    if (icon.endsWith('n')) {   
        document.getElementById('hero-img').style.backgroundImage = "url('../images/phil-botha-a0TJ3hy-UD8-unsplash_1120x730.jpg')";
        document.querySelector(DOM_ELEMENTS.image_source).innerHTML = 'Photo by <a href="https://unsplash.com/@philbotha?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Phil Botha</a> on <a href="https://unsplash.com/s/photos/night-time?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Unsplash</a>'
    } else if (icon.match(/[0][2-9]d+/)) {
        document.getElementById('hero-img').style.backgroundImage = "url('../images/tim-oliver-metz-glFocUiIyWo-unsplash_1120x730.jpg')";
        document.querySelector(DOM_ELEMENTS.image_source).innerHTML = 'Photo by <a href="https://unsplash.com/@to_metz?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Tim-Oliver Metz</a> on <a href="https://unsplash.com/s/photos/cloudy-day?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Unsplash</a>'
    } else if (icon.match(/[1][0-1]d+/))  {
        document.getElementById('hero-img').style.backgroundImage = "url('../images/fotografierende-3ENfnnjbdJs-unsplash_1120x730.jpg')";
        document.querySelector(DOM_ELEMENTS.image_source).innerHTML = 'Photo by <a href="https://unsplash.com/@fotografierende?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">fotografierende</a> on <a href="https://unsplash.com/s/photos/rainy-day?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Unsplash</a>'
    } else if (icon == '13d') {
        document.getElementById('hero-img').style.backgroundImage = "url('../images/adam-chang-IWenq-4JHqo-unsplash_1120x730.jpg')";
        document.querySelector(DOM_ELEMENTS.image_source).innerHTML = 'Photo by <a href="https://unsplash.com/@sametomorrow?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Adam Chang</a> on <a href="https://unsplash.com/s/photos/snowing?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Unsplash</a>'
    } else {
        document.getElementById('hero-img').style.backgroundImage = "url('../images/andrey-grinkevich-0x6RTts1jRU-unsplash_1120x730.jpg')";
        document.querySelector(DOM_ELEMENTS.image_source).innerHTML = 'Photo by <a href="https://unsplash.com/@grin?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Andrey Grinkevich</a> on <a href="https://unsplash.com/collections/4686133/sunny-day-summer?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Unsplash</a>'
    }
}


const KtoF = (temp) => {
    return (((temp-273.15)*1.8)+32).toFixed()
}

//backgroundImage = "url('../images/phil-botha-a0TJ3hy-UD8-unsplash.jpg')"
//(icon == /[0-9][0-9]n/) {
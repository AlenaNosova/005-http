const http = require('http');
const { myAPIKey, CITY } = process.env; 

const url = `http://api.weatherstack.com/current?access_key=${myAPIKey}&query=${CITY}`;       

http.get(url, (res) => {
    const {statusCode} = res;
    if (statusCode !== 200){
        console.log(`statusCode: ${statusCode}`);
        return;
    }

    res.setEncoding('utf8');
    let rowData = '';
    res.on('data', (chunk) => rowData += chunk);
    res.on('end', () => {
        let parseData = JSON.parse(rowData);
        // console.log(parseData);
        console.log('Прогноз погоды для', parseData.location.name);
        console.log('-----------------------');
        console.log('Температура:', parseData.current.temperature);
        console.log('Описание:', parseData.current.weather_descriptions);
        console.log('Ветер:', parseData.current.wind_speed);
    })
}).on('error', (err) => {
    console.error(err);
})



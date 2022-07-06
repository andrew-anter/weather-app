const request = require('postman-request')

const forecast = (latitude, longitude , callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=a9b3ff130a30c64a84d7df97d2763c00&query='+ latitude + ',' + longitude +'&units=m' 

    request({url , json : true} , (error,{ body }) => {
        if(error){
            callback('Unable to connect to weather services, It might be a connection error or the services are down',undefined,undefined)
        } else if (body.error) {
            callback('Unable to find location,',undefined, undefined)
        }
        else {
            const {weather_descriptions : weatherDescription, temperature: weatherTemperature , feelslike: weatherFeelslike } = body.current
            const {country : weatherCountry , region : weatherRegion} = body.location;

            callback(undefined, `The weather is ${weatherDescription}. It's currently ${weatherTemperature} Celsius degrees out. It feels like ${weatherFeelslike} Celsius degrees out.` , {country : weatherCountry, region : weatherRegion})
        }
    })
}


module.exports = forecast
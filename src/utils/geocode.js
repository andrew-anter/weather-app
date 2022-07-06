const request = require('postman-request')

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoiYW5kcmV3LWFudGVyIiwiYSI6ImNreDlldDR1YTA0NG8ybnAwMmVodWprbG4ifQ.pV8xFi7yF-60r5Cpyz2maw&limit=1'

    request({url, json : true}, (error ,{ body }) => {
        if(error){
            callback('Unable to connect to location services!, Check your internet connection',undefined)
        } else if (body.features.length === 0){
            callback('Invalid location, Please try again', undefined)
        } else {
            data = body.features[0].center
            callback(undefined,{
                latitude:  body.features[0].center[1],
                longitude: body.features[0].center[0],
                location:  body.features[0].place_name
            })
        }
    })
}

module.exports = geocode

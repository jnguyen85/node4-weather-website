const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = 'https://api.darksky.net/forecast/e22327ad237c4418fc6b50a7718750ec/' + 
    latitude + ',' + longitude + '?units=us'

        request({ url, json:true }, (error, { body }) => {
            if (error) {
                callback('Unable to connect to weather service', undefined);
            } else if (body.error) {
                callback('Unable to find location', undefined);
            } else {
                const data = {
                    temperature: body.currently.temperature,
                    precipProbability: body.currently.precipProbability,
                    summary: body.daily.data[0].summary
                }
                callback(undefined, `${data.summary} It is currently ${data.temperature} degrees out. There is a ${data.precipProbability}% chance of rain.`)
            }
        })

}

module.exports = forecast
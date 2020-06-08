
const request = require('request')

const geocode = (address, callback) => {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?limit=1&access_token=pk.eyJ1IjoiZmFyYXoxMzIzZHNmIiwiYSI6ImNrYjBiczUydDA2aHEyeXFqc2F3c3FuZmEifQ.xk6mmLkQlo5zIlzRFfnMZw`

    request({ url, json: true }, (err, {body}) => {
        if (err) {
            callback('Unable to connect to the Server:(')
        } else if (body.features.length === 0) {
            callback('Unable to locate your address:(')
        } else {
            callback(undefined, {
                longitude : body.features[0].center[0],
                latitude :  body.features[0].center[1],
                placeName:  body.features[0].place_name
            })
        }

    })
}




module.exports = geocode




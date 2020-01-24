var moment = require('moment');

// generates a message
var generateMessage = (from, text) => {
    return {
        from,
        text,
        createAt: moment().valueOf()
    }
}

//gets the location asked
var generateLocationMessage = (from, latitude, longtitude) => {
    return {
        from,
        url: `https://www.google.com/maps?q=${latitude},${longtitude}`,
        createAt: moment().valueOf()
    }
}

module.exports = {generateMessage, generateLocationMessage};
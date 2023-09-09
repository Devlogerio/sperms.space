// Made by Cena Abachi Known as Devlogerio, find me on Youtube, Instagram, and Github: Devlogeiro LinkedIn: Cena Abachi, devloger.io@gmail.com
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

// Made by Cena Abachi Known as Devlogerio, find me on Youtube, Instagram, and Github: Devlogeiro LinkedIn: Cena Abachi, devloger.io@gmail.com
const Victor = require('victor');
const {randomBetweenTwoNumbers} = require('./functions');
const {vagina} = require('./createWorld');

class Shield {
    constructor (id, room) {
        this.id = id;
        this.room = room;
        this.location = new Victor(0, 0); // TODO get random location on spawn places
        this.r = randomBetweenTwoNumbers(5, 10);//2;
    }
    spawn () {
        
    }
    getInitPack () {
        var pack = {
            id: this.id,
            room: this.room,
            location: this.location.toObject(),
            r: this.r,
        }
        return pack;
    }
    getMomentPack () {
        var pack = {
            id: this.id,
            location: this.location.toObject(),
        }
        return pack;
    }
    getStandAloneServerMomentPack () {
        var pack = {
            id: this.id,
            location: this.location,
            r: this.r,
        }
        return pack;
    }
}

module.exports = {Shield};

// Made by Cena Abachi Known as Devlogerio, find me on Youtube, Instagram, and Github: Devlogeiro LinkedIn: Cena Abachi, devloger.io@gmail.com
const Victor = require('victor');
const {randomBetweenTwoNumbers} = require('./functions');
const {vagina} = require('./createWorld');

class Egg {
    constructor (id, room) {
        this.id = id;
        this.room = room;
        this.location = new Victor(0, 0);
        this.r = 100;
    }
    spawn () {
        var yPoint = vagina.left.length-7;
        var vlPoint = new Victor(vagina.left[yPoint].x, vagina.left[yPoint].y);
        var vrPoint = new Victor(vagina.right[yPoint].x, vagina.right[yPoint].y);
        var d = Math.sqrt(vlPoint.distanceSq(vrPoint));
        this.location = new Victor(vlPoint.x + d/2, vlPoint.y);
    }
    getInitPack () {
        var pack = {
            room: this.room,
            location: this.location.toObject(),
            r: this.r,
        }
        return pack;
    }
}

module.exports = {Egg};

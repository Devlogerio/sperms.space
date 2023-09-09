// Made by Cena Abachi Known as Devlogerio, find me on Youtube, Instagram, and Github: Devlogeiro LinkedIn: Cena Abachi, devloger.io@gmail.com
const Victor = require('victor');
const {randomBetweenTwoNumbers} = require('./functions');
const {vagina} = require('./createWorld');

class Food {
    constructor (id, room, where) {
        this.id = id;
        this.room = room;
        this.location = new Victor(0, 0); // TODO get random location on spawn places
        this.r = 2;//2;
        this.respawnTime = 80;//randomBetweenTwoNumbers(50, 100);
        this.timer = this.respawnTime;
        this.ate = false;
        this.where = where;
    }
    spawn () {
        var yPoint = 1;
        if(this.where === 'allover') {
            yPoint = randomBetweenTwoNumbers(1,vagina.left.length-50);
            var vlPoint = new Victor(vagina.left[yPoint].x, vagina.left[yPoint].y);
            var vrPoint = new Victor(vagina.right[yPoint].x, vagina.right[yPoint].y);
            var d = Math.sqrt(vlPoint.distanceSq(vrPoint));
            this.location = new Victor(randomBetweenTwoNumbers(vlPoint.x, vlPoint.x+d), vlPoint.y);
        } else if (this.where === 'aroundegg') {
            this.location = eggs[0].location.clone();
            this.location.x += randomBetweenTwoNumbers(-600, 600);
            this.location.y += randomBetweenTwoNumbers(-200, 1500);
        }
    }
    update () {
        if(this.ate === true) {
            this.timer--;
            if(this.timer <= 0) {
                this.ate = false;
                this.timer = this.respawnTime;
            }
        }
    }
    getInitPack () {
        var pack = {
            id: this.id,
            room: this.room,
            location: this.location.toObject(),
        }
        return pack;
    }
    getMomentPack () {
        var pack = {
            id: this.id,
            ate: this.ate,
        }
        return pack;
    }
    getStandAloneServerMomentPack () {
        var pack = {
            id: this.id,
            location: this.location,
            ate: this.ate,
        }
        return pack;
    }
}

module.exports = {Food};


const Victor = require('victor');
const {randomBetweenTwoNumbers} = require('./functions');
const {vagina} = require('./createWorld');

class Hammer {
    constructor (id, room) {
        this.id = id;
        this.room = room;
        this.location = new Victor(0, 0); // TODO get random location on spawn placeS
        this.width = randomBetweenTwoNumbers(50, 200);//2;
        this.height = 5;//2;
        this.speed = randomBetweenTwoNumbers(1, 10);
        this.limitMove = {maxX: 0, minX: 0};
    }
    spawn () {
        // this.location = new Victor(0 + randomBetweenTwoNumbers(-500,1000), -1250 + randomBetweenTwoNumbers(-1250,1250)); // TODO change on the fly numbers to variables
        // var yPoint = randomBetweenTwoNumbers(500,900);
        var yPoint = randomBetweenTwoNumbers(570,844);
        var vlPoint = new Victor(vagina.left[yPoint].x, vagina.left[yPoint].y);
        var vrPoint = new Victor(vagina.right[yPoint].x, vagina.right[yPoint].y);
        var d = Math.sqrt(vlPoint.distanceSq(vrPoint));
        this.location = new Victor(randomBetweenTwoNumbers(vlPoint.x, vlPoint.x+d), vlPoint.y);
        this.limitMove = {maxX: this.location.x + this.width, minX: this.location.x - this.width};
    }
    update() {
        this.location.x += this.speed;
        if(this.location.x > this.limitMove.maxX) {
            this.speed = -this.speed;
        }
        if(this.location.x < this.limitMove.minX) {
            this.speed = -this.speed;
        }
    }
    getInitPack () {
        var pack = {
            id: this.id,
            room: this.room,
            location: this.location.toObject(),
            width: this.width,
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
            width: this.width,
        }
        return pack;
    }
}

module.exports = {Hammer};
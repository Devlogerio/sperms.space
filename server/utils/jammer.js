
const Victor = require('victor');
const {randomBetweenTwoNumbers} = require('./functions');
const {vagina} = require('./createWorld');

class Jammer {
    constructor (id, room) {
        this.id = id;
        this.room = room;
        this.location = new Victor(0, 0); // TODO get random location on spawn places
        this.r = 1;//2;
        this.speed = Math.random() + 0.1;
        this.limitMove = {maxX: 0, minX: 0};
        this.witchWay = randomBetweenTwoNumbers(0, 1);
    }
    spawn () {
        var yPoint = randomBetweenTwoNumbers(15,560);
        var vlPoint = new Victor(vagina.left[yPoint].x, vagina.left[yPoint].y);
        var vrPoint = new Victor(vagina.right[yPoint].x, vagina.right[yPoint].y);
        var d = Math.sqrt(vlPoint.distanceSq(vrPoint));
        // if(d < this.r*2) {
        //     this.spawn();
        //     return;
        // }
        this.location = new Victor(randomBetweenTwoNumbers(vlPoint.x + this.r, vlPoint.x + d - this.r), vlPoint.y);
        this.r = (Math.round(d*0.03) + 0.2) * 2;//2;
        this.limitMove = {maxX: this.location.x + (this.r * 2), minX: this.location.x - (this.r * 2), maxY: this.location.y + (this.r * 2), minY: this.location.y - (this.r * 2)};
    }
    update() {
        if(this.witchWay === 0) {
            this.location.x += this.speed;
            if(this.location.x > this.limitMove.maxX) {
                this.speed = -this.speed;
            }
            if(this.location.x < this.limitMove.minX) {
                this.speed = -this.speed;
            }
        } else {
            this.location.y += this.speed;
            if(this.location.y > this.limitMove.maxY) {
                this.speed = -this.speed;
            }
            if(this.location.y < this.limitMove.minY) {
                this.speed = -this.speed;
            }
        }
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

module.exports = {Jammer};
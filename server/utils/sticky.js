
const Victor = require('victor');
const {randomBetweenTwoNumbers} = require('./functions');
const {vagina} = require('./createWorld');

class Sticky {
    constructor (id, room) {
        this.id = id;
        this.room = room;
        this.location = new Victor(0, 0); // TODO get random location on spawn places
        this.r = 6;//2;
    }
    spawn () {
        var leftRightSwitcher = randomBetweenTwoNumbers(0, 1);
        var yPoint = randomBetweenTwoNumbers(15,vagina.left.length-50);
        var vlPoint = new Victor(vagina.left[yPoint].x, vagina.left[yPoint].y);
        var vrPoint = new Victor(vagina.right[yPoint].x, vagina.right[yPoint].y);
        var d = Math.sqrt(vlPoint.distanceSq(vrPoint));
        if(d < 125) {
            this.spawn();
            return;
        }
        if(leftRightSwitcher === 0) {
            this.location = new Victor(vagina.left[yPoint].x, vagina.left[yPoint].y);
        } else {
            this.location = new Victor(vagina.right[yPoint].x, vagina.left[yPoint].y);
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

module.exports = {Sticky};
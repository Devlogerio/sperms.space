// Made by Cena Abachi Known as Devlogerio, find me on Youtube, Instagram, and Github: Devlogeiro LinkedIn: Cena Abachi, devloger.io@gmail.com
const Victor = require('victor');
const {Entity} = require('./entity');
const {randomBetweenTwoNumbers, limitVector} = require('./functions');
const {vagina} = require('./createWorld');

class Killer extends Entity {
    constructor (id, room) {
        super();
        this.id = id;
        this.room = room;
        this.r = 5;//2;
        this.grabDistance = 125;
        this.velocityMaxLimit = (Math.random() * 2.9) + 1;
        this.forceLimit = 0.5;//0.3;
        this.damage = 10;
        this.respawnTime = 100;
        this.timer = this.respawnTime;
        this.hited = false;
        this.startLocation;
        this.stopped = true;
        this.angle = 0;
        // this.isChasing = false;
    }
    spawn () {
        // var yPoint = randomBetweenTwoNumbers(15,vagina.left.length-50);
        var yPoint = randomBetweenTwoNumbers(846,925);
        var vlPoint = new Victor(vagina.left[yPoint].x, vagina.left[yPoint].y);
        var vrPoint = new Victor(vagina.right[yPoint].x, vagina.right[yPoint].y);
        var d = Math.sqrt(vlPoint.distanceSq(vrPoint));
        if(d < 100) {
            this.spawn();
            return;
        }
        this.location = new Victor(randomBetweenTwoNumbers(vlPoint.x, vlPoint.x+d), vlPoint.y);
        this.startLocation = this.location.clone();
    }
    update() {
        if(this.hited === true) {
            this.timer--;
            if(this.timer <= 0) {
                this.hited = false;
                this.timer = this.respawnTime;
                this.location = this.startLocation.clone();
            }
            return;
        }
        var grabbed = false;
        var distRecord = this.grabDistance;
        var grabbedLocation; 
        for(var i in sperms.entities) {
            if(sperms.entities[i].isDead === false) {
                var spermLocation = sperms.entities[i].location.clone();
                var d = spermLocation.distance(this.location);
                if(d <= distRecord) {
                    grabbed = true;
                    distRecord = d;
                    grabbedLocation = spermLocation;
                    if(d <= sperms.entities[i].r + this.r) {
                        this.hited = true;
                        sperms.entities[i].hp -= this.damage;
                    }
                }
            }
        }
        
        if(grabbed === true) {
            this.stopped = false;
            var force = new Victor(grabbedLocation.x - this.location.x, grabbedLocation.y - this.location.y);
            this.angle = force.angle();
            this.applyForce(force);
        }

        if(grabbed === false) {
            if(this.stopped === true) {
                return;
            }
            var force = new Victor(this.startLocation.x - this.location.x, this.startLocation.y - this.location.y);
            this.applyForce(force);
            var d = this.location.distance(this.startLocation);
            if(d < 1) {
                this.isMoving = false;
                this.velocity = new Victor(0,0);
                this.stopped = true;
            }
        }
        super.update();
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
            hited: this.hited,
            angle: this.angle,
        }
        return pack;
    }
    getStandAloneServerMomentPack () {
        var pack = {
            id: this.id,
            location: this.location,
        }
        return pack;
    }
}

module.exports = {Killer};

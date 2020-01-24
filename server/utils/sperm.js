const Victor = require('victor');
const {Entity} = require('./entity');
const {limitVector, rotateVector, randomBetweenTwoNumbers, getAngleBetweenTwoVectors} = require('./functions');
const {vagina} = require('./createWorld');

class Sperm extends Entity {
    constructor (id, name, childName, room) {
        super();
        this.id = id;
        this.name = name;
        this.childName = childName;
        this.room = room;
        this.angle = 0;
        this.middle = new Victor(0,0);
        this.location = new Victor(0, 2500); // TODO get random location on spawn place
        this.isMouseHold = false;
        this.r = 4;
        this.savedVelocityLimit = this.velocityMaxLimit;
        this.velocitySlowdMaxLimit = 1;
        this.slowed = false;
        this.whoJammed = -1;
        this.boostNumber = 3;
        this.isBoosting = false;
        this.onBoostVelocity = this.velocityMaxLimit + 1;
        this.maxBoostCapasity = 300;
        this.boostCapasity = this.maxBoostCapasity;
        this.howManyAte = 0;
        this.hp = 100;
        this.isDead = false;
        this.enterAmount = 200;
        this.isRaceEnd = false;
        // this.inRace = false;
        //this.velocityMaxLimit = 15;
    }
    spawn () {
        // this.location = new Victor(eggs[0].location.x + 200, eggs[0].location.y); // TODO change on the fly numbers to variables
        // this.location = new Victor(0 + randomBetweenTwoNumbers(-280,280), -2500); // TODO change on the fly numbers to variables
        this.location = new Victor(0 + randomBetweenTwoNumbers(-280,280), 2800 + randomBetweenTwoNumbers(-300,300)); // TODO change on the fly numbers to variables
    }
    update () {
        if(this.checkDeath() === true || this.isRaceEnd === true) {
            return;
        }
        super.update();
        this.boostCheck();
        this.move();
        // this.checkPress();
        this.checkVaginaCollision();
        this.checkSpermCollision();
        this.checkHammersCollision();
        // if(this.inRace === false) {
        //     return;
        // }
        this.checkJammerCollision();
        this.checkFoodCollision();
        this.checkStickyCollision();
        this.checkEggCollision();
    }
    checkDeath () {
        if(this.hp <= 0) {
            this.isDead = true;
            return true;
        } else {
            return false;
        }
    }
    move () {
        if(this.isMouseHold === true) {
            var force = limitVector(new Victor(Math.cos(this.angle), Math.sin(this.angle)).subtract(this.middle), this.forceLimit);
            this.applyForce(force);
            this.isMoving = true;
        } else {
            this.isMoving = false;
        }
    }
    // checkPress () {
    //     if(this.inRace === true) {
    //         if(this.location.y > 2500) {
    //             var force = new Victor(0, -10);
    //             this.applyForce(force);
    //         }
    //     }
    // }
    boostCheck () {
        if(this.isBoosting === true) {
            this.boostCapasity--;
            if(this.boostCapasity <= 0) {
                this.isBoosting = false;
                this.velocityMaxLimit = this.savedVelocityLimit;
            }
        }
        if(this.isBoosting === false && this.boostCapasity < this.maxBoostCapasity) {
            this.boostCapasity++;
        }
    }
    boost () {
        if(this.isBoosting === true || this.boostNumber < 1) {
            return;
        }
        
        console.log('Boost!');
        this.boostNumber--;
        this.isBoosting = true;
        this.velocityMaxLimit = this.onBoostVelocity;
    }
    mouseAction (mouse) {
        if(mouse.hold == true) {
            this.isMouseHold = true;
            this.angle = mouse.angle;
        } else {
            this.isMouseHold = false;
        }
    }
    // check collision with left side of the vagina
    checkVaginaCollision () {
        for(var i = 1 ; i < vagina.left.length - 1 ; i++){
            if(vagina.left[i-1].y > this.location.y && this.location.y > vagina.left[i+1].y){
                if(this.location.x < vagina.left[i].x - offsetVaginaLeft){
                    var road = new Victor(vagina.left[i].x - vagina.left[i+1].x , vagina.left[i].y - vagina.left[i+1].y);
                    var pointer = rotateVector(road, 90);
                    pointer = limitVector(pointer, this.vaginaPushBack);
                    this.applyForce(pointer);
                }
            }
        }
        for(var i = 1 ; i < vagina.right.length - 1 ; i++){
            if(vagina.right[i-1].y > this.location.y && this.location.y > vagina.right[i+1].y){
                if(this.location.x > vagina.right[i].x + offsetVaginaRight){
                    var road = new Victor(vagina.right[i+1].x - vagina.right[i].x, vagina.right[i+1].y - vagina.right[i].y);
                    var pointer = rotateVector(road, 90);
                    pointer = limitVector(pointer, this.vaginaPushBack);
                    this.applyForce(pointer);
                }
            }
        }
        if(this.location.y > vagina.right[0].y) {
            var force = new Victor(0, -5);
            this.applyForce(force);
        }
    }
    checkJammerCollision() {
        var jammersMomentPack = jammers.getEntitiesStandAloneServerMomentPack();
        if(this.slowed === false) {
            for(var i in jammersMomentPack) {
                var j = jammersMomentPack[i];
                var d = this.location.distance(j.location);
                if(d < j.r) { // this.r + 
                    this.velocityMaxLimit = this.velocitySlowdMaxLimit;
                    this.whoJammed = i;
                    this.slowed = true;
                    this.hp -= 5;
                }
            }
        } else if (this.slowed === true) {
            var j = jammersMomentPack[this.whoJammed];
            var d = this.location.distance(j.location);
            if(d > j.r) { // this.r + 
                if(this.isBoosting === true) {
                    this.velocityMaxLimit = this.onBoostVelocity;
                } else {
                    this.velocityMaxLimit = this.savedVelocityLimit;
                }
                this.whoJammed = -1;
                this.slowed = false;
            }
        }
    }
    checkSpermCollision() {
        var spermsMomentPack = sperms.getEntitiesStandAloneServerMomentPack();
        for(var i in spermsMomentPack) {
            if(spermsMomentPack[i].id !== this.id && spermsMomentPack[i].isDead === false) {
                var otherSperm = spermsMomentPack[i];
                var d = this.location.distance(otherSperm.location);
                if(d < this.r * 2) {
                    var betweenVector = this.location.clone().subtract(otherSperm.location);
                    var force = new Victor(5, 5).rotate(betweenVector.angle());
                    this.applyForce(force);

                    var force = new Victor(5, 5).rotate(this.acceleration.angle());
                    force.multiply(new Victor(20, 20))
                    this.applyForce(force.rotate(Math.PI));
                }
            }
        }
    }
    checkHammersCollision() {
        var hammerMomentpack = hammers.getEntitiesStandAloneServerMomentPack();
        for(var i = 0; i < hammerMomentpack.length ; i++) {
            var hammer = hammerMomentpack[i];
            var hRightSide = hammer.location.x + hammer.width/2 + this.r;
            var hLeftSide = hammer.location.x - hammer.width/2 - this.r;
            var hUpSide = hammer.location.y - this.r - 3;
            var hDownSide = hammer.location.y + this.r + 3;
            if(this.location.x > hLeftSide && this.location.x < hRightSide && this.location.y > hUpSide && this.location.y < hDownSide) {
                if(this.location.y < hammer.location.y) {
                    var force = new Victor(0, -200); // notice the negative behind the y
                    this.applyForce(force);
                    // this.hp -= 2;
                } else {
                    var force = new Victor(0, 200);
                    this.applyForce(force);
                    // this.hp -= 2;
                }
            }
        }
    }
    checkFoodCollision() {
        var foodsMomentPack = foods.getEntitiesStandAloneServerMomentPack();
        for(var i = 0; i < foodsMomentPack.length ; i++) {
            var f = foodsMomentPack[i];
            if(f.ate === false) {
                var d = this.location.distance(f.location);
                if(d < this.r + 2) {
                    foods.getEntity(f.id).ate = true;
                    this.howManyAte++;
                    this.hp += 1;
                }
            }
        }
    }
    checkStickyCollision() {
        for(var i in stickiesMomentPack) {
            var s = stickiesMomentPack[i];
            var d = this.location.distance(s.location);
            if(d < this.r + s.r) {
                this.hp = 0;
            }
        }
    }
    checkEggCollision() {
        var d = this.location.distance(eggs[0].location);
        if(d < eggs[0].r) {
            if(this.hp >= this.enterAmount) {
                endGameAction(this.room, this.id, this.name, this.childName);
            } else {
                var force = new Victor(this.location.x - eggs[0].location.x, this.location.y - eggs[0].location.y);
                // var force = new Victor(100, 100).rotate(this.acceleration.angle());
                this.applyForce(force);
            }
        }
    }
    respawn() {
      // happends after death
    }
    getInitPack () {
        var pack = {
            id: this.id,
            name: this.name,
            room: this.room,
            r: this.r,
            location: this.location.toObject()
        }
        return pack;
    }
    getMomentPack () {
        var pack = {
            id: this.id,
            location: this.location.toObject(),
            angle: this.velocity.angle(),
            isMoving: this.isMouseHold,
            isBoosting: this.isBoosting,
            howManyAte: this.howManyAte,
            boostNumber: this.boostNumber,
            hp: this.hp,
            isDead: this.isDead,
        }
        return pack;
    }
    getStandAloneServerMomentPack () {
        var pack = {
            id: this.id,
            location: this.location,
            isDead: this.isDead,
            r: this.r,
            acceleration: this.acceleration,
            // angle: this.velocity.angle(),
            // isMoving: this.isMouseHold,
        }
        return pack;
    }
}

module.exports = {Sperm};

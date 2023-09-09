// Made by Cena Abachi Known as Devlogerio, find me on Youtube, Instagram, and Github: Devlogeiro LinkedIn: Cena Abachi, devloger.io@gmail.com
const Victor = require('victor');

// limits a vector to a certain amount of magnitud
var limitVector = (givenVector, limit) => {
    var vector = givenVector;
    var mag = vector.magnitude();
    if(mag > limit){
        vector.x = vector.x * limit / mag;
        vector.y = vector.y * limit / mag;
        return vector;
    }
    return vector;
}

// rotaites the vector by DEGREE
var rotateVector = function(vec, ang)
{
    ang = toRadians(-ang);// -ang * (Math.PI/180)
    var cos = Math.cos(ang);
    var sin = Math.sin(ang);
    return new Victor(Math.round(10000*(vec.x * cos - vec.y * sin))/10000, Math.round(10000*(vec.x * sin + vec.y * cos))/10000);
};

// returns a random number between any two numbers even negative numbers
randomBetweenTwoNumbers = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

// Converts from degrees to radians.
toRadians = function(degrees) {
    return degrees * Math.PI / 180;
};
   
  // Converts from radians to degrees.
toDegrees = function(radians) {
    return radians * 180 / Math.PI;
};

getAngleBetweenTwoVectors = function(v1, v2) {
    var dx = v2.x - v1.x;
    var dy = v2.y - v1.y;
    return Math.atan2(dx, dy);
}

module.exports = {limitVector, randomBetweenTwoNumbers, rotateVector, toRadians, toDegrees, getAngleBetweenTwoVectors};

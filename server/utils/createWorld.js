const SimplexNoise = require('simplex-noise');
const {toRadians, toDegrees} = require('./functions');
var vagina = {};

// this is vagina creator, vagina is noisy so we never see same vagina ever somehow
createWorld = (length, mapWidth, roadWidth) => { // length is the length of the vagina, mapWidth is the width of the game map. roadWidth is the distance between left of the vagina and right of the vagina
  var simplex = new SimplexNoise();
  var inc = 0.006;//0.018 pn width 500
  var inc1 = 0.04;
  var start = 0//randomBetweenTwoNumbers(-mapWidth/2, mapWidth/2);
  var xoff = start;
  var xoff1 = start;
  var left = [];
  var right = [];
  var middleWidh = mapWidth/2
  var middleHeight = length/2
  var scale = 5;

  //x(t)=x0+rcos(t), y(t)=y0+rsin(t), for t∈[startAngle,endAngle].


  // Generating Testy
  var startAngle = 90;
  var endAngle = 240;
  var startAngle1 = 90;
  var endAngle1 = -60;
  var r = 300;
  var step = 10;
  var angle = 360;
  // left side of testie
  for (var i = -angle; i < angle; i+=step) {
    var theta = i;
      if(theta >= startAngle && theta <= endAngle)
      {
        var x = Math.cos(toRadians(theta)) * r;
        var y = Math.sin(toRadians(theta)) * r;
        left.push({x: x, y: y + middleWidh + r}); // y + 100
      }
  }
  //left.push({x: -roadWidth/2, y: middleWidh + 50});
  // right side of testie
  for (var i = angle; i > -angle; i-=step) {
    var theta = i;
      if(theta <= startAngle1 && theta >= endAngle1)
      {
        var x = Math.cos(toRadians(theta)) * r;
        var y = Math.sin(toRadians(theta)) * r;
        right.push({x: x, y: y + middleWidh + r}); // y + 100
      }
  }
  //right.push({x: -roadWidth/2 + r, y: middleWidh + 50});



  // Generating vagina and other between parts
  for(var y = middleHeight ; y > -middleHeight ; y-=10){
    var x = simplex.noise2D(xoff, 0) * mapWidth/2;
    var xGel = simplex.noise2D(xoff1, 0) * 90;
    left.push({x: x + xGel - roadWidth/2, y});
    right.push({x: x - xGel + roadWidth/2, y});
    xoff += inc;
    xoff1 += inc1;
  }

  for(var i = 0 ; i < 4 * scale ; i++) {
    left.push({x: left[left.length - 1].x, y: left[left.length - 1].y - 10});
    right.push({x: right[right.length - 1].x, y: right[right.length - 1].y - 10});
  }

  for(var i = 0 ; i < 4 * scale ; i++) {
    left.push({x: left[left.length - 1].x - 5, y: left[left.length - 1].y - 10});
    right.push({x: right[right.length - 1].x + 5, y: right[right.length - 1].y - 10});
  }

  for(var i = 0 ; i < 5 * scale ; i++) {
    left.push({x: left[left.length - 1].x - step, y: left[left.length - 1].y - step});
    right.push({x: right[right.length - 1].x + step, y: right[right.length - 1].y - step});
  }


  for(var i = 0 ; i < 4 * scale ; i++) {
    left.push({x: left[left.length - 1].x - 3, y: left[left.length - 1].y - 10});
    right.push({x: right[right.length - 1].x + 3, y: right[right.length - 1].y - 10});
  }


  for(var i = 0 ; i < 20 * scale ; i++) {
    left.push({x: left[left.length - 1].x, y: left[left.length - 1].y - step});
    right.push({x: right[right.length - 1].x, y: right[right.length - 1].y - step});
  }



  for(var i = 0 ; i < 4 * scale ; i++) {
    left.push({x: left[left.length - 1].x - 3, y: left[left.length - 1].y - 10});
    right.push({x: right[right.length - 1].x + 3, y: right[right.length - 1].y - 10});
  }

  for(var i = 0 ; i < 4 * scale ; i++) {
    left.push({x: left[left.length - 1].x - 5, y: left[left.length - 1].y - 10});
    right.push({x: right[right.length - 1].x + 5, y: right[right.length - 1].y - 10});
  }

  for(var i = 0 ; i < 10 * scale ; i++) {
    left.push({x: left[left.length - 1].x - step, y: left[left.length - 1].y - step});
    right.push({x: right[right.length - 1].x + step, y: right[right.length - 1].y - step});
  }

  for(var i = 0 ; i < 4 * scale ; i++) {
    left.push({x: left[left.length - 1].x - 3, y: left[left.length - 1].y - 10});
    right.push({x: right[right.length - 1].x + 3, y: right[right.length - 1].y - 10});
  }


  for(var i = 0 ; i < 5 * scale ; i++) {
    left.push({x: left[left.length - 1].x, y: left[left.length - 1].y - step});
    right.push({x: right[right.length - 1].x + 5, y: right[right.length - 1].y - 10});
  }

  for(var i = 0 ; i < 4 * scale ; i++) {
    left.push({x: left[left.length - 1].x + 3, y: left[left.length - 1].y - 10});
  }

  for(var i = 0 ; i < 8 * scale ; i++) {
    left.push({x: left[left.length - 1].x + step*9, y: left[left.length - 1].y - step});
  }
  for(var i = 0 ; i < 5 * scale ; i++) {
    left.push({x: left[left.length - 1].x + step*4, y: left[left.length - 1].y - step});
    right.push({x: right[right.length - 1].x + step*4, y: right[right.length - 1].y - step});
  }
  for(var i = 0 ; i < 7 * scale ; i++) {
    right.push({x: right[right.length - 1].x + step*4, y: right[right.length - 1].y - step});
  }
  for(var i = 0 ; i < 5 * scale ; i++) {
    left.push({x: left[left.length - 1].x, y: left[left.length - 1].y - step});
    right.push({x: right[right.length - 1].x, y: right[right.length - 1].y - step});
    right.push({x: right[right.length - 1].x, y: right[right.length - 1].y - step});
  }



  // Generating Testy
  startAngle = 90;
  endAngle = 240;
  startAngle1 = -60;
  endAngle1 = 90;
  r = roadWidth/2 + 100 * scale * 2;
  step = 10;
  angle = 360;
  var lastLeftY = left[left.length - 1].y;
  var lastRightY = right[right.length - 1].y;
  var lastLeftX = left[left.length - 1].x;
  var lastRightX = right[right.length - 1].x;
  for (var i = angle; i > -angle; i-=step) {
    var theta = i;
      if(theta >= startAngle && theta <= endAngle)
      {
        var x = Math.cos(toRadians(theta)) * r;
        var y = Math.sin(toRadians(theta)) * r;
        left.push({x: x + lastLeftX + r/2, y: lastLeftY - y - r}); // y + 100
      }
  }
  for (var i = -angle; i < angle; i+=step) {
    var theta = i;
      if(theta >= startAngle1 && theta <= endAngle1)
      {
        var x = Math.cos(toRadians(theta)) * r;
        var y = Math.sin(toRadians(theta)) * r;
        right.push({x: x + lastRightX - r/2, y: lastRightY - y - r}); // y + 100
      }
  }

  return {left, right};
}

vagina = createWorld(5000, 5000, 235); // creates a new vagina ad the begining of the server startup
module.exports = {vagina};
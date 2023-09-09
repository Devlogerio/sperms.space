// Made by Cena Abachi Known as Devlogerio, find me on Youtube, Instagram, and Github: Devlogeiro LinkedIn: Cena Abachi, devloger.io@gmail.com
var myId = ''; // stores the id of the connected sperm (the controller of the player)
var mouseLocation = 0; // stores the location of the mouse each frame and its a vector not number
var planeSize = {width: 5000, height: 5000};
var spermModel;
var spermTexture;
var jammerModel;
var eggModel;
var stickyModel;
var secondRendered;
var infoDiv;
var raceEndDiv;
var afterDeathDiv;
var hpDiv;
var zoom;
var imDone;


// connecting to the server
var socket = io();
// if connected
socket.on('connect', function() {
  // we get the params from the url
  params = $.deparam(window.location.search);
  // var windowSize = {windowWidth,windowHeight};
  // TODO add a clientside param validation
  // asking to join a room with specific name
  socket.emit('join', params, function (err) {
      if (err) { // error happens from servers callback
          alert(err);
          window.location.href = '/'; // takes the user back to home page
      } else { // otherwise
          // TODO make a welcome message instead of a log
          console.log('Succesfully joined.');
      }
  });
  myId = socket.id; // sets the id of controler(sperm, player)
});

// listening for the initialization package, only happens once after connecting
socket.on('init', function(data) {
  // loop through the recieved data
  for(var i = 0 ; i < data.sperms.length ; i++) {
    new Sperm(data.sperms[i]); // adds the online sperm to local sperms
  }
  for(var i = 0 ; i < data.jammers.length ; i++) {
    new Jammer(data.jammers[i]); // adds the online sperm to local sperms
  }
  for(var i = 0 ; i < data.hammers.length ; i++) {
    new Hammer(data.hammers[i]); // adds the online sperm to local sperms
  }
  for(var i = 0 ; i < data.killers.length ; i++) {
    new Killer(data.killers[i]); // adds the online sperm to local sperms
  }
  for(var i = 0 ; i < data.foods.length ; i++) {
    new Food(data.foods[i]); // adds the online sperm to local sperms
  }
  for(var i = 0 ; i < data.stickies.length ; i++) {
    console.log(1);
    new Sticky(data.stickies[i]); // adds the online sperm to local sperms
  }
  Vagina(data.vagina); // we make the vagina from the information we got
  Egg(data.egg);
});

// listening for a new sperm connection
socket.on('newSperm', function(sperm) {
  new Sperm(sperm);; // adds the online sperm to local sperms
});

// listening for any sperm that leaves
socket.on('leftSperm', function(spermId) {
  delete Sperm.list[spermId]; // delete that sperm from the local sperms
});

// listening for each little changes in all game
socket.on('moment', function(data) {
  for(var i = 0 ; i < data.sperms.length ; i++) { // loops through all sperm changes
    // setting local sperm data to online sperm data
    // TODO validate by ID
    var spermMoment = data.sperms[i];
    var s = Sperm.list[spermMoment.id];
    s.location.x = int(spermMoment.location.x);
    s.location.y = int(spermMoment.location.y);
    s.angle = spermMoment.angle;
    s.isMoving = spermMoment.isMoving;
    s.isBoosting = spermMoment.isBoosting;
    s.howManyAte = spermMoment.howManyAte;
    s.boostNumber = spermMoment.boostNumber;
    s.hp = spermMoment.hp;
    s.isDead = spermMoment.isDead;
    if(imDone === false && myId === spermMoment.id && spermMoment.isDead === true) {
      afterDeathDiv.style.display = 'block';
      imDone = true;
    }
  }
  for(var i = 0 ; i < data.jammers.length ; i++) { // loops through all sperm changes
    // setting local sperm data to online sperm data
    // TODO validate by ID
    var jammersMoment = data.jammers[i];
    var j = Jammer.list[jammersMoment.id];
    j.location.x = int(jammersMoment.location.x);
    j.location.y = int(jammersMoment.location.y);
  }
  for(var i = 0 ; i < data.hammers.length ; i++) { // loops through all sperm changes
    // setting local sperm data to online sperm data
    // TODO validate by ID
    var hammerMoment = data.hammers[i];
    var h = Hammer.list[hammerMoment.id];
    h.location.x = int(hammerMoment.location.x);
    h.location.y = int(hammerMoment.location.y);
  }
  for(var i = 0 ; i < data.killers.length ; i++) { // loops through all sperm changes
    // setting local sperm data to online sperm data
    // TODO validate by ID
    var killerMoment = data.killers[i];
    var k = Killer.list[killerMoment.id];
    k.location.x = int(killerMoment.location.x);
    k.location.y = int(killerMoment.location.y);
    k.hited = killerMoment.hited;
    k.angle = killerMoment.angle;
  }
  for(var i = 0 ; i < data.foods.length ; i++) { // loops through all sperm changes
    // setting local sperm data to online sperm data
    // TODO validate by ID
    var foodMoment = data.foods[i];
    var f = Food.list[foodMoment.id];
    f.ate = foodMoment.ate;
  }
});

socket.on('endGame', function(data) {
  console.log('race is end and ');
  if(data.id === myId) {
    infoDiv.innerHTML = "You WON the race!</br>";
    infoDiv.innerHTML = data.name + " your baby " + data.childName + " will born in 9 months! ";
  } else {
    infoDiv.innerHTML = "You LOST the race!</br>";
    infoDiv.innerHTML = data.name + " is going to have a baby named " + data.childName;
  }
  infoDiv.style.display = 'block';
  var timeCounter = setTimeout(function() {
    infoDiv.style.display = 'none';
    raceEndDiv.style.display = 'block';
    clearTimeout(timeCounter);
  }, 15000);
});

socket.on('timesUp', function(data) {
  console.log('race time is out');
  infoDiv.innerHTML = "Times Up!</br>";
  infoDiv.style.display = 'block';
  var timeCounter = setTimeout(function() {
    infoDiv.style.display = 'none';
    raceEndDiv.style.display = 'block';
    clearTimeout(timeCounter);
  }, 15000);
});

// listening for disconnection
socket.on('disconnect', function() {
  // TODO do something better than just logging
  console.log('Disconnected from server');
  window.location.href = '/'; // takes the user back to home page
});

// setting everything up before starting the game
function setup() {
  hpDiv = document.getElementById('hpDiv');
  infoDiv = document.getElementById('infoDiv');
  raceEndDiv = document.getElementById('raceEndDiv');
  afterDeathDiv = document.getElementById('afterDeathDiv');
  createCanvas(windowWidth, windowHeight, WEBGL);
  secondRendered = createGraphics(windowWidth, windowHeight, WEBGL);
  // frameRate(25);
  angleMode(RADIANS);
  zoom = 200;
  imDone = false;
  spermModel = loadModel('mdl/sperm.obj');
  jammerModel = loadModel('mdl/jammer.obj');
  eggModel = loadModel('mdl/egg.obj');
  stickyModel = loadModel('mdl/sticky.obj');
  spermTexture = loadImage('mdl/spermTexture.jpg');
  addLights();
}

// main local game loop
function draw() {
  if(!Sperm.list[myId]) { // if player doesnt exist so we do nothing
    return;
  }
  var me = Sperm.list[myId];

  drawConsole(me);

  background(255, 255, 255,255);
  secondRendered.background(255,128,147,255);
  ambientLight(255, 255, 255, 255);

  cameraSetup(me.location.x, me.location.y); // updating camera

  // draw Plane
  drawPlane();
  // draw vagina
  secondRendered.push();
  secondRendered.emissiveMaterial(164,64,74,255);
  secondRendered.strokeWeight(5);
  secondRendered.stroke(238,177,174,255);
  for (var i in Vagina.list) { // drawing all the vaginas we have
    Vagina.list[i].draw(me.location);
  }
  secondRendered.pop();

  // draw sperm
  for (var i in Sperm.list) { // drawing all the players
    secondRendered.push();
    Sperm.list[i].draw();
    secondRendered.pop();
  }
  for (var i in Jammer.list) { // drawing all the players
    secondRendered.push();
    secondRendered.noStroke();
    Jammer.list[i].draw(me.location);
    secondRendered.pop();
  }
  for (var i in Hammer.list) { // drawing all the players
    secondRendered.push();
    secondRendered.rectMode(CENTER);
    secondRendered.noStroke();
    secondRendered.ambientMaterial(120,140,80,255);
    Hammer.list[i].draw(me.location);
    secondRendered.pop();
  }
  for (var i in Killer.list) { // drawing all the players
    secondRendered.push();
    Killer.list[i].draw(me.location);
    secondRendered.pop();
  }
  for (var i in Food.list) { // drawing all the players
    secondRendered.push();
    Food.list[i].draw(me.location);
    secondRendered.pop();
  }
  for (var i in Sticky.list) { // drawing all the players
    secondRendered.push();
    Sticky.list[i].draw(me.location);
    secondRendered.pop();
  }

  secondRendered.push();
  Egg.theEgg.draw(me.location); // draw egg
  secondRendered.pop();

  push();
  texture(secondRendered);
  rect(-width/2, -height/2, secondRendered.width ,secondRendered.height);
  pop();

  if(mouseIsPressed) {
    socket.emit('mouse',{hold: true, angle: getAngle(mouseX, mouseY, width/2, height/2)}); // we tell server about the mouse
  }
}

function cameraSetup(x, y) {
  mouseLocation = createVector((mouseX - width / 2), (mouseY - height / 2), 0); // gets the location of the mouse according to the middle of the screen
  var loc = createVector(x, y).sub(mouseLocation.limit(100)); // getts the vector between the players sperm and mouse and limits its length (magnitude) by 100
  //TODO make the camera 3rd person means that the up of the camera should allways face the up of the sperm
  secondRendered.camera(loc.x, loc.y, zoom, x, y, 0, 0, 1, 0);

  let locX = mouseX - width / 2;
  let locY = mouseY - height / 2;
  noLights();
  pointLight(255, 255, 255, locX, locY, 250);
  addLights()
}

function addLights() {
  secondRendered.noLights();
  secondRendered.pointLight(255, 255, 255, 5000, 5000, 2000);
  secondRendered.pointLight(255, 255, 255, 5000, -5000, 2000);
  secondRendered.pointLight(255, 255, 255, -5000, 5000, 2000);
  secondRendered.pointLight(255, 255, 255, -5000, 5000, 2000);
}

function drawConsole(me) {
  hpDiv.innerHTML = "&#128420 " + me.hp + "/200</br>&#9889  " + me.boostNumber;
}

// draws the map
function drawPlane () {
  // secondRendered.push();
  // // secondRendered.ambientLight(10, 10, 110);
  // secondRendered.translate(0, 0, -5);
  // secondRendered.noStroke();
  // secondRendered.ambientMaterial(255);
  // secondRendered.plane(planeSize.width, planeSize.height, 0);
  // secondRendered.pop();
}

function mouseWheel(event) {
  var newZoom = zoom + event.delta;
  zoom = lerp(zoom, newZoom, 0.1);
  zoom = constrain(zoom, 100, 400);
  return false;
}

function mouseReleased() { // if the mouse is released
  socket.emit('mouse',{hold: false}); // we tell server about the mouse
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  secondRendered.resizeCanvas(windowWidth, windowHeight);
}

var getAngle = function( x1, y1, x2, y2 ) {
	var	dx = x1 - x2;
  var dy = y1 - y2;
	return atan2(dy,dx); // Important for server, cuz there we use Radians instead of Degree
};

function keyReleased() {
  if(keyCode === 32) {
    if(myId !== "") {
        socket.emit('boost');
      }
  }
}

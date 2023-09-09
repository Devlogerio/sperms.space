// Made by Cena Abachi Known as Devlogerio, find me on Youtube, Instagram, and Github: Devlogeiro LinkedIn: Cena Abachi, devloger.io@gmail.com
// note: in my sudo, a player is called sperm
const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');
const mongojs = require('mongojs');
// const db = mongojs('localhost:27017/spermsDataBase',['ladder']);

const {isRealString, isValidRoom, rooms} = require('./utils/validation');
const {EntityHolder} = require('./utils/entityHolder');
const {Egg} = require('./utils/egg');
const {vagina} = require('./utils/createWorld');

// setting up the server
const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;
var app = express();
var server = http.createServer(app);
var io = socketIO(server);
app.use(express.static(publicPath));


// app.get("/ladder", (req, res, next) => {
// //  res.json(["Tony","Lisa","Michael","Ginger","Food"]);
// //  res.sendFile(ladderPath);

// db.ladder.find(function (err, docs) {
//     if(err) {y
//        res.send('404 Not found');
//     }
//     console.log(docs);
//     res.send('<div style="width:100%; height:100%; background-color: yellow"> ' + docs[0].name + ' </div>');
// })
// });
   
// defining global variables
var SOCKET_LIST = {};
var jammersPopulation = 100;
var hammersPopulation = 180;
var killersPopulation = 100;
var foodsPopulation = 800;
var stickiesPopulation = 150;
var timeToStart = 20000;
// var doorCloseTime = 5000;
// var roundTime = 5000;
global.offsetVaginaRight = 10;
global.offsetVaginaLeft = 12;
global.sperms = new EntityHolder('sperm'); // setting up the sperm holder we created
global.jammers = new EntityHolder('jammer'); // setting up the jammer holder we created
global.hammers = new EntityHolder('hammer'); // setting up the hammer holder we created
global.killers = new EntityHolder('killer'); // setting up the killer holder we created
global.foods = new EntityHolder('food'); // setting up the food holder we created
global.stickies = new EntityHolder('sticky'); // setting up the killer holder we created
global.stickiesMomentPack;
global.eggs = [];

server.listen(port, () => {
    console.log(`Server is up on port ${port}`);
})

function createEggs() {
    eggs.push(new Egg(Math.random(), "ir"));
    for(var i in eggs) {
        eggs[i].spawn();
    }
}
createEggs();

function addJammers() {
    for(var i = 0 ; i < jammersPopulation ; i++) {
        jammers.addEntity({id: Math.random(), room: "ir"});
    }
    jammersMomentPack = jammers.getEntitiesStandAloneServerMomentPack();
}
addJammers();

function addHammers() {
    for(var i = 0 ; i < hammersPopulation ; i++) {
        hammers.addEntity({id: Math.random(), room: "ir"});
    }
    hammers.addEntity({id: 'closer', room: "ir"});
    var h = hammers.getEntity('closer');
    h.location.x = 0;
    h.location.y = 2550;
    h.width = 450;
    h.speed = 0;
}
addHammers();

function addKillers() {
    for(var i = 0 ; i < killersPopulation ; i++) {
        killers.addEntity({id: Math.random(), room: "ir"});
    }
}
addKillers();

function addFoods() {
    for(var i = 0 ; i < foodsPopulation ; i++) {
        foods.addEntity({id: Math.random(), room: "ir", where: "allover"});
    }
    for(var i = 0 ; i < foodsPopulation/2 ; i++) {
        foods.addEntity({id: Math.random(), room: "ir", where: "aroundegg"});
    }
}
addFoods();

function addStickies() {
    for(var i = 0 ; i < stickiesPopulation ; i++) {
        stickies.addEntity({id: Math.random(), room: "ir"});
    }
    stickiesMomentPack = stickies.getEntitiesStandAloneServerMomentPack();
}
addStickies();

// when each sperm connects
io.on('connection', (socket) => {
    console.log('Sperm connected.'); // TODO make a log so all data about cinnected and disconnected players will be store there during runtime
    SOCKET_LIST[socket.id] = socket;
    var sperm = {};

    // TODO make a higher power validation for all socket emits and on's
    // each sperm connects to specific room, otherwise, nothing
    socket.on('join', (params, callback) => {
        // checking the validation of data recieved from user
        if (!isRealString(params.name) || !isRealString(params.childName) || !isValidRoom(params.room)) {
            return callback('Name and room name are required.');
        }
        socket.join(params.room); // joins the sperm to the wanted room
        sperms.removeEntity(socket.id); // if any sperm existed with the same id, it will be removed first
        sperms.addEntity({id: socket.id, name: params.name, childName: params.childName, room: params.room}); // we add the new sperm to our list of sperms wich is an entityHolder
        socket.emit('init', {sperms: sperms.getPackFromAllEntities(params.room, 'init'), jammers: jammers.getPackFromAllEntities(params.room, 'init'), hammers: hammers.getPackFromAllEntities(params.room, 'init'), killers: killers.getPackFromAllEntities(params.room, 'init'), foods: foods.getPackFromAllEntities(params.room, 'init'), stickies: stickies.getPackFromAllEntities(params.room, 'init'), egg: eggs[0].getInitPack(), vagina}); // sending the vagina and all existing sperms to the connected sperm
        socket.broadcast.to(params.room).emit('newSperm', sperms.getEntity(socket.id)); // we send the information about the connected sperm to all other existing players
        callback(); // this will make user sure we gave them answer
        sperm = sperms.getEntity(socket.id);
    });

    socket.on('boost', () => {
        sperm.boost();
    });

    // getting the information about mouse movement and clicks
    socket.on('mouse', (mouse) => {
        sperm.mouseAction(mouse); // we send the mouse data to the owners sperm entity
        // sperms.getEntity(socket.id).mouseAction(mouse); // we send the mouse data to the owners sperm entity
    });

    // when sperm disconnects
    socket.on('disconnect', () => {
        var sperm = sperms.removeEntity(socket.id); // we remove it from the list of sperms
        if (sperm) { // if it was real and has been removed
            socket.broadcast.to(sperm.room).emit('leftSperm', sperm.id); // we tell everyone which sperm is removed
        }
        delete SOCKET_LIST[socket.id]; // we also delete the socket information about that sperm from our socketlist
        console.log('Sperm disconnected.'); // TODO make a log so all data about cinnected and disconnected players will be store there during runtime
    });
});
// var lastTime = new Date().getTime();
// Games main loop
setInterval(() => {
    // var newTime = new Date().getTime();
    // lastTime = newTime;
    // console.log(1000/25);
    sperms.updateEntities(); // updating all sperms
    hammers.updateEntities(); // updating all sperms
    killers.updateEntities(); // updating all sperms
    foods.updateEntities(); // updating all sperms
    jammers.updateEntities(); // updating all sperms
    for(var i = 0 ; i < rooms.length ; i++) {
        io.to(rooms[i]).emit('moment', {sperms: sperms.getPackFromAllEntities(rooms[i], 'moment'), jammers: jammers.getPackFromAllEntities(rooms[i], 'moment'), hammers: hammers.getPackFromAllEntities(rooms[i], 'moment'), killers: killers.getPackFromAllEntities(rooms[i], 'moment'), foods: foods.getPackFromAllEntities(rooms[i], 'moment')}); // sending the moment information of each sperm to everyone in the same room
    }
},40);//1000/25


global.endGameAction = function(room, id, name, childName) {
    var winResault = {name: name, childName: childName};
    // db.ladder.insert(winResault);
    winResault.id = id;
    io.to(room).emit('endGame', winResault);
    for(var i in sperms.entities) {
        sperms.entities[i].isRaceEnd = true;
        // if(sperms.entities[i].inRace === true) {
            // sperms.entities[i].isRaceEnd = true;
            // sperms.entities[i].inRace = false;
        // }
    }
    roundAct(room);
}

// global.timeUpAction = function(room) {
//     io.to(room).emit('timesUp');
//     for(var i in sperms.entities) {
//         if(sperms.entities[i].inRace === true) {
//             if(sperms.entities[i].inRace === true) {
//                 sperms.entities[i].isRaceEnd = true;
//                 sperms.entities[i].inRace = false;
//             }
//         }
//     }
//     roundAct(room);
// }

// var timeOutTimer;
roundAct('ir');
function roundAct(room) {
    // clearTimeout(timeOutTimer);
    hammers.getEntity('closer').location.y = 2550;
    io.to(room).emit('startGame', {time: timeToStart});
    setTimeout(() => {
        hammers.getEntity('closer').location.y = 5000;
        // hammers.getEntity('closer').width = 300;
        for(var i in sperms.entities) {
            var s = sperms.entities[i];
            s.inRace = true;
        }
        // setTimeout(() => {
        //     hammers.getEntity('closer').location.y = 2550;
        // }, doorCloseTime);
        // timeOutTimer = setTimeout(() => {
        //     timeUpAction(room);
        // }, roundTime);
    }, timeToStart);
}

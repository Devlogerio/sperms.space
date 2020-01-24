
var rooms = ["ir"]; // all the rooms sperms can access //["ir"],"us","eu"]

// checks if the string is really an string and there is no empty spaces
var isRealString = (str) => {
    return typeof str === 'string' && str.trim().length > 0;
}

// checks the validation of the room, if it is in the list of allowed rooms or not
var isValidRoom = (room) => {
    for(var i = 0 ; i < rooms.length ; i++) {
        if(room === rooms[i]){
            return true;
        }
    }
    return false;
}

module.exports = {isRealString, isValidRoom, rooms};


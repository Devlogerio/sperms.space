// Made by Cena Abachi Known as Devlogerio, find me on Youtube, Instagram, and Github: Devlogeiro LinkedIn: Cena Abachi, devloger.io@gmail.com
// this is the creator of vagona
var Vagina = function (vagina) {
    var self = {};
    self.id = random(); // we assign a random id to craeted vagina for now
    self.left = vagina.left;
    self.right = vagina.right;
    self.draw = function (playerLocation) {
      // secondRendered.fill(150, 200, 100, 255);
      secondRendered.beginShape();
      for(var i in self.left){ // var i = 0 ; i < self.left.length ; i++
        if(dist(playerLocation.x, playerLocation.y, playerLocation.x, self.left[i].y) < 500) { //Magic Number!
          secondRendered.vertex(self.left[i].x, self.left[i].y, -5);
        }
      }
      for(var i = self.right.length - 1 ; i >= 0; i--){
        if(dist(playerLocation.x, playerLocation.y, playerLocation.x, self.right[i].y) < 500) { //Magic Number!
          secondRendered.vertex(self.right[i].x, self.right[i].y, -5);
        }
      }
      secondRendered.endShape(CLOSE);
    }
    Vagina.list[self.id] = self;// we stor the vagina by its id to the vagina list
  }
  Vagina.list = {}; // this list is infact allways contains 1 vagina
  

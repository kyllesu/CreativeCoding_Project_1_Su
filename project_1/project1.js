let drops = []; //array to create multiple drops
let person1; 
let person2;

function setup() {
  createCanvas(windowWidth, windowHeight);
  for (var i = 0; i < 350; i++) { //generates up to 350 raindrops 
    drops[i] = new Drop();
  }
  person1 = new Person(0,windowHeight-200);
  person2 = new Person(windowWidth,windowHeight-200);
}

function draw() {
  
  background(0,25);
  person1.move(1);
  person1.display();
  person2.move(-1);
  person2.display();
  for (var i = 0; i < drops.length; i++) {
    drops[i].fall();
    drops[i].show();
  }

}


class Drop {
  
  constructor() {
    //positions the rain in different locations on the window & offscreen
    this.x = random(width);
    this.y = random(-500, -50);
    this.z = random(0, 20);
    this.len = map(this.z, 0, 20, 10, 20);
    this.yspeed = map(this.z, 0, 20, 4, 20);// z axis will create depth 
  }
  
  
  fall() { //creating raindrop to fall
    var grav = mouseX / 350;
    this.y = this.y + this.yspeed * grav;
  
    if (this.y >= windowHeight - 100) {
      noFill();
      noStroke();
      fill(255, 150);
      ellipse(this.x, windowHeight - random(5, 90), random(2, 5), random(1, 4));
      this.x = random(0,width);
      this.y = random(-200, -100);
      this.yspeed = map(this.z, 0, 20, 4, 10);
      
    }
  }

  show() { //drop to be rendered on screen
    var thick = map(this.z, 0, 20, 1, 3);
    strokeWeight(thick); //adds thickness to closer droplets
    stroke(130)
    line(this.x, this.y, this.x, this.y+this.len);
  }
}

class Person {
  
  constructor(x,y) {
    this.x = x;
    this.y = y;
  }
  
  move(direction) {
    
    this.x = this.x + 1*direction;
    this.y = this.y ;
    //making them stop and touch (DOES NOT WORK)
    if (this.x == windowWidth/2 - 200 || windowWidth/2 +200) {
      this.x = this.x
    }  
  }
  
  display() {
    stroke(255);
    strokeWeight(3);
    noFill();
    ellipse(this.x, this.y, 50, 50);
    line(this.x,this.y + 25, this.x, this.y + 75);
  }
}

//i made a change


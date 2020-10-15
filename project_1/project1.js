let drops = []; //array to create multiple drops
let person1; 
let person2;
let hasStopped = false;

function setup() {
  createCanvas(1000, 1000);
  for (var i = 0; i < 350; i++) { //generates up to 350 raindrops 
    drops[i] = new Drop();
  }
  person1 = new Person(0,height-200);
  person2 = new Person(width,height-200);
}

function draw() {
  
  background(0,25);
  person1.move(1);
  person1.display();
  person1.stop();

  person2.move(-1);
  person2.display();
  person2.stop();
  
  for (var i = 0; i < drops.length; i++) {
    drops[i].fall();
    drops[i].show();
  }
  
  heart();
}

function heart() { //create a heart at an instance
  
  if (hasStopped == true) {
    noStroke();
    fill(255);
    ellipse(width/2,height/2,25,25); // this will be a larger heart that decreases in size and opacity 
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
  
    if (this.y >= height - 100) {
      noFill();
      noStroke();
      fill(255, 150);
      ellipse(this.x, height - random(5, 90), random(2, 5), random(1, 4));
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
    
    this.x = this.x + 1*direction; //speed
    this.y = this.y ;
  }

    stop() { //will stop the people
    if (person1.x > width/2 - 30) {
      person1.x = width/2 - 30
      hasStopped = true; //check for stop
    }
  
    if (person2.x < width/2 + 30) {
      person2.x = width/2 + 30;
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


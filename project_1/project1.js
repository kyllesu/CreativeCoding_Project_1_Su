let drops = []; //array to create multiple drops
let stars = []; //array to create multiple stars
let person1;
let person2;
let hasStopped = false;
let heartX, heartY;
let gradient = 100;


function setup() {
  createCanvas(windowWidth, windowHeight);

  for (var s = 0; s < 700; s++) { //generates 700 stars
    stars[s] = new Star();
  }
  for (var i = 0; i < 350; i++) { //generates up to 350 raindrops 
    drops[i] = new Drop();
  }

  person1 = new Person(0, height - 300);
  person2 = new Person(width, height - 300);
  heartX = 100;

}

function draw() {

  background(0, 25);

  for (var s = 0; s < stars.length; s++) {
    stars[s].displayStar();
  }
  
  theMoon();

  person1.displayHead();
  person1.displayBody();
  person1.displayFrontLeg(1);
  person1.displayBackLeg(1);
  person1.move(1);
  person1.stop();

  person2.displayHead();
  person2.displayBody();
  person2.displayFrontLeg(-1);
  person2.displayBackLeg(-1);
  person2.move(-1);
  person2.stop();

  for (var i = 0; i < drops.length; i++) {
    drops[i].fall();
    drops[i].show();
  }

  heart();
  
}

function heart() { //create a heart at an instance

  if (hasStopped == true) {
    fill(255);
    stroke(255);
    strokeWeight(5);
    line(width / 2 - 40, height - 255, width / 2 - 23, height - 220); //left person elbow 
    line(width / 2 - 23, height - 220, width / 2 - 3, height - 265); //left person arm
    line(width / 2 + 40, height - 255, width / 2 + 23, height - 220); //right person elbow
    line(width / 2 + 23, height - 220, width / 2 + 3, height - 265); //right person arm

    heartX += 0.3;
    heartY = 3 * (cos(heartX) + sin(heartX / 2)) + 110;

    fill(255, random(180, 205), random(220, 230));
    noStroke();
    translate(width / 2, height / 2 - heartY + 50);
    rotate(PI / 4.0);
    square(0, 0, heartY);
    circle(heartY / 2, 0, heartY);
    circle(0, heartY / 2, heartY);

  }
}

function theMoon() {
  
  for (var moonlight = gradient; moonlight > 0; moonlight = moonlight - 1) {
    var moonlightSize = map(moonlight, gradient, 0, 450, 100); //size of moonlight
    noStroke();
    fill(lerpColor(color(0,25), color(0, 125, 255), 1 - moonlight / gradient)); //black to blue inwards moonlight gradient
    ellipse(140, 140, moonlightSize, moonlightSize); //position of moonlight
  } 

  for (var moon = gradient; moon > 0; moon = moon - 1) {
    var moonSize = map(moon, gradient, 0, 280, 0); //size of moon
    noStroke();
    fill(lerpColor(color(0, 180, 255), color(255), 1 - moon * 9 / 10 / gradient * 1 / 3)); //gradient moon colors
    ellipse(140, 140, moonSize, moonSize); //position of moon
  } 
}

class Star {

  constructor() {
    this.x = random(width);
    this.y = random(0, height - 150);
  }

  displayStar() {
    stroke(random(100, 255), random(220, 255), 255); //twinkle twinkle 
    strokeWeight(random(1, 3));
    point(this.x, this.y);
  }
}

class Drop {

  constructor() {
    //positions the rain in different locations on the window & offscreen
    this.x = random(width);
    this.y = random(-500, -50);
    this.z = random(0, 20);
    this.len = map(this.z, 0, 20, 10, 20);
    this.yspeed = map(this.z, 0, 20, 4, 20); // z axis will create depth 
  }


  fall() { //creating raindrop to fall
    var grav = mouseX / 350;
    this.y = this.y + this.yspeed * grav;

    if (this.y >= height - 100) {
      noFill();
      noStroke();
      fill(255, 150);
      ellipse(this.x, height - random(5, 90), random(2, 5), random(1, 4));
      this.x = random(0, width);
      this.y = random(-200, -100);
      this.yspeed = map(this.z, 0, 20, 4, 10);

    }
  }

  show() { //drop to be rendered on screen
    var thick = map(this.z, 0, 20, 1, 3);
    strokeWeight(thick); //adds thickness to closer droplets
    stroke(130)
    line(this.x, this.y, this.x, this.y + this.len);
  }
}

class Person {

  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.state = 1;
  }

  move(direction) {

    this.x = this.x + 0.65 * direction; //speed
    this.y = this.y;
    this.state = (this.state + 5) % 3; // transition between both states to create walking animation
  }

  stop() { //will stop the people
    if (person1.x > width / 2 - 40) {
      person1.x = width / 2 - 40
      hasStopped = true; //check for stop
      this.state = 2; // stop person at standing still
    }

    if (person2.x < width / 2 + 40) {
      person2.x = width / 2 + 40;
      this.state = 2
    }
  }

  displayHead() {
    fill(255);
    noStroke();
    ellipseMode(CENTER);
    ellipse(this.x, this.y - 35, 75, 75); // head
  }

  displayBody() {
    fill(255);
    stroke(255);
    strokeWeight(5);
    line(this.x, this.y + 5, this.x, this.y + 130); // body
  }

  displayFrontLeg(facing) {
    if (this.state == 1) {
      line(this.x, this.y + 130, this.x + 30 * facing, this.y + 170); // forward thigh
      line(this.x + 30 * facing, this.y + 170, this.x + 10 * facing, this.y + 240); // forward shin
    } else if (this.state == 2) {
      line(this.x, this.y + 130, this.x + 10 * facing, this.y + 170); //transition
      line(this.x + 10 * facing, this.y + 170, this.x, this.y + 240);
    }
  }

  displayBackLeg(facing) {
    if (this.state == 1) {
      line(this.x, this.y + 130, this.x - 30 * facing, this.y + 240); // back leg
    } else if (this.state == 2) {
      line(this.x, this.y + 130, this.x, this.y + 240); //transition
    }

  }

}
//i made a change


let drops = []; //array to create multiple drops
let stars = []; //array to create multiple stars
let person1;
let person2;
let hasStopped = false;
let heartX, heartY;
let gradient = 100;

let speed = 0;

let len = 65;
let a1, a2, a3, a4;
let legSpeed = 0;


function setup() {
  createCanvas(windowWidth, windowHeight);

  for (var s = 0; s < 700; s++) { //generates 700 stars
    stars[s] = new Star();
  }
  for (var i = 0; i < 350; i++) { //generates up to 350 raindrops 
    drops[i] = new Drop();
  }

  person1 = new Person(-100, height - 300);
  person2 = new Person(width + 100, height - 300);
  heartX = 100;

}

function draw() {

  background(0, 25);

  for (var s = 0; s < stars.length; s++) {
    stars[s].displayStar();
  }

  spotlight();  
  theMoon();

  person1.displayHead();
  person1.displayBody();
  person1.displayLegs(1);

  person1.move(1);
  person1.stop();

  person2.displayHead();
  person2.displayBody();
  person2.displayLegs(-1);

  person2.move(-1);
  person2.stop();

  for (var i = 0; i < drops.length; i++) {
    drops[i].fall();
    drops[i].show();
  }

  heart();
  
}

//STARTING SPEEDS
function keyTyped() {
  if (key === '1') {
    speed = 0.75;
  }else if (key === '2') {
    speed = 1;
  }else if (key === '3') {
    speed = 1.25;
  }else if (key === '4') {
    speed = 8; //for testing purposes
  }

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

function spotlight() {
  
  if (hasStopped == true) {
    spotlightColor = lerpColor(color(0), color(0, 125, 255),0.6);
    spotlightColor.setAlpha(8);    
    fill(spotlightColor);
    noStroke();
    beginShape();
    vertex(width/2 - 150, 100);
    vertex(width/2 - 200, height - 40);
    vertex(width/2 + 200, height - 40);
    vertex(width/2 + 150,100);
    endShape(CLOSE);
  }
    
}

function theMoon() {
  
  for (var moonlight = gradient; moonlight > 0; moonlight = moonlight - 1) {
    var moonlightSize = map(moonlight, gradient, 0, 400, 100); //size of moonlight
    noStroke();
    fill(lerpColor(color(0,25), color(0, 125, 255), 1 - moonlight / gradient)); //black to blue inwards moonlight gradient
    ellipse(width/2, 140, moonlightSize, moonlightSize); //position of moonlight
  } 

  for (var moon = gradient; moon > 0; moon = moon - 1) {
    var moonSize = map(moon, gradient, 0, 240, 0); //size of moon
    noStroke();
    fill(lerpColor(color(0, 180, 255), color(255), 1 - moon * 9 / 10 / gradient * 1 / 3)); //gradient moon colors
    ellipse(width/2, 140, moonSize, moonSize); //position of moon
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

    this.x = this.x + speed * direction; //speed
    this.y = this.y;
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

 displayLegs(facing) {
    a1 = sin(legSpeed);
    a2 = sin(legSpeed - 0.4) - 0.5;
    a3 = sin(PI + legSpeed);
    a4 = sin(PI + legSpeed - 0.4) - 0.5;

    let leftKneeX = this.x + sin(a1) * len * facing;
    let leftKneeY = this.y + cos(a1) * len;
    let rightKneeX = this.x + sin(a3) * len * facing;
    let rightKneeY = this.y + cos(a3) * len;

    let leftAnkleX = leftKneeX + sin(a2) * len * facing;
    let leftAnkleY = leftKneeY + cos(a2) * len;
    let rightAnkleX = rightKneeX + sin(a4) * len * facing;
    let rightAnkleY = rightKneeY + cos(a4) * len;

    if (this.state == 1) {
      line(this.x, this.y + 130, leftKneeX, leftKneeY + 130);
      line(leftKneeX, leftKneeY + 130, leftAnkleX, leftAnkleY + 130);
      line(this.x, this.y + 130, rightKneeX, rightKneeY + 130);
      line(rightKneeX, rightKneeY + 130, rightAnkleX, rightAnkleY + 130);

    }else if (this.state == 2) {
      line(this.x, this.y + 130, this.x + 10 * facing, this.y + 170); //transition
      line(this.x + 10 * facing, this.y + 170, this.x, this.y + 240);
      line(this.x, this.y + 130, this.x, this.y + 240);
    }

    legSpeed += 0.02;

  }



}
//i made a change


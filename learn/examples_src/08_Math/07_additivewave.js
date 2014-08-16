/*
 * @name Additive Wave
 * @frame 720,400 (optional)
 * @description Create a more complex wave by adding two waves together.
 * Original by Daniel Shiffman
 */
 
var xspacing = 8;   // How far apart should each horizontal location be spaced
var w;              // Width of entire wave
var maxwaves = 4;   // total # of waves to add together

var theta = 0.0;
var amplitude = new Array(maxwaves);   // Height of wave
var dx = new Array(maxwaves);          // Value for incrementing X, to be calculated as a function of period and xspacing
var yvalues;                           // Using an array to store height values for the wave (not entirely necessary)

function setup() {
  createCanvas(720, 400);
  frameRate(30);
  colorMode(RGB, 255, 255, 255, 100);
  w = width + 16;

  for (var i = 0; i < maxwaves; i++) {
    amplitude[i] = random(10,30);
    var period = random(100,300); // How many pixels before the wave repeats
    dx[i] = (TWO_PI / period) * xspacing;
  }

  yvalues = new Array(w/xspacing);
}

function draw() {
  background(0);
  calcWave();
  renderWave();
}

function calcWave() {
  // Increment theta (try different values for 'angular velocity' here
  theta += 0.02;

  // Set all height values to zero
  for (var i = 0; i < yvalues.length; i++) {
    yvalues[i] = 0;
  }
 
  // Accumulate wave height values
  for (var j = 0; j < maxwaves; j++) {
    var x = theta;
    for (var i = 0; i < yvalues.length; i++) {
      // Every other wave is cosine instead of sine
      if (j % 2 == 0)  yvalues[i] += sin(x)*amplitude[j];
      else yvalues[i] += cos(x)*amplitude[j];
      x+=dx[j];
    }
  }
}

function renderWave() {
  // A simple way to draw the wave with an ellipse at each location
  noStroke();
  fill(255,50);
  ellipseMode(CENTER);
  for (var x = 0; x < yvalues.length; x++) {
    ellipse(x*xspacing,width/2+yvalues[x],16,16);
  }
}

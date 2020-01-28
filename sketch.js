/*
    Date: 2019.08.24
    Developer: AmebaHead
    Description: Ameba's Gift Wrapping Algorithm
    Version: 1.1
*/

// Constant Value
let buffer = 50;

// Global Variable
const points = [];
var orgPoints = [];
var edgePoints = [];

let leftMostPoint;
let currentPoint;
let theta = 0;

let isEnd = false;

function setup() {
  frameRate(60);
  createCanvas(500, 500);
  
  // Generate Points
  for (let i = 0; i < 50; i++) {
    let randomX = random(buffer, width - buffer);
    let randomY = random(buffer, height - buffer);
    let randomVector = createVector(randomX, randomY);
    
    points.push(randomVector);
    orgPoints.push(randomVector);
  }
  
  // Sort Point
  points.sort((a,b) => a.x - b.x);
  // print(points);
  // print(orgPoints);
  
  leftMostPoint = points[0];
  currentPoint = leftMostPoint;
}

function draw() {
  background(0);
  
  stroke(255);
  strokeWeight(5);
  for (let p of points) {
    point(p.x, p.y);
  }
  
  if (isEnd == false) {
    // Display Radar
    var radi = radians(theta);
    var sinValue = sin(radi) * (width) * -1;
    var cosValue = cos(radi) * (width);

    if (theta > 360) {
      theta = 0;
    } else {
      theta++;
    }

    var radarX = currentPoint.x - cosValue;
    var radarY = currentPoint.y + sinValue;

    stroke(250,50,50);
    strokeWeight(2);
    line(currentPoint.x, currentPoint.y, radarX, radarY);

    // Check Collide Radar with Points
    for (let i = 0; i < orgPoints.length; i++) {
      let p = orgPoints[i];
      if (linePoint(currentPoint.x, currentPoint.y, radarX, radarY, p.x, p.y) == true) {
        print("- Matching -");
        print(p.x + "," + p.y);

        edgePoints.push(p);
        orgPoints.splice(i, 1);

        currentPoint = p;
      }
      // End Condition
      else {
        if (currentPoint != leftMostPoint) {
          if(linePoint(currentPoint.x, currentPoint.y, radarX, radarY, leftMostPoint.x, leftMostPoint.y) == true) {
            print("- Done -");
            isEnd = true;
            break;
          }
        }
      }
    }
  
  }
  
  // Display Edge Points && Line
  beginShape();
  for (let eP of edgePoints) {
    stroke(0,250,0);
    strokeWeight(10);
    point(eP.x, eP.y);  
    
    stroke(0,0,250);
    strokeWeight(2);
    fill(0, 0, 255, 50);
    vertex(eP.x, eP.y);
  }
  endShape(CLOSE);
}


// MARK: - Function
function linePoint(x1, y1, x2, y2, px, py) {
  let d1 = dist(px, py, x1, y1);
  let d2 = dist(px, py, x2, y2);
  
  let lineLen = dist(x1, y1, x2, y2);
  
  let buffer = 0.5;
  
    if (d1+d2 >= lineLen-buffer && d1+d2 <= lineLen+buffer) {
    return true;
  }
  return false;
  
}












































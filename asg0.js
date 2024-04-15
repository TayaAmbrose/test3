// asg0.js
function main() {
    // Retrieve <canvas> element
    canvas = document.getElementById('cnv1');
    if (!canvas) {
        console.log('Failed to retrieve the <canvas> element');
        return false;
    }
    // Get the rendering context for 2DCG
    ctx = canvas.getContext('2d');

    // create the black canvas square
    ctx.fillStyle = 'rgba(0, 0, 0, 1.0)'; // black color for the square
    ctx.fillRect(0, 0, canvas.width, canvas.height); // Fill a rectangle with the color

    //handleDrawEvent();
} 

function drawVector(v, color) {
    xcoor = v.elements[0] * 20;
    ycoor = v.elements[1] * 20;

    ctx.strokeStyle = color;

    let cx = canvas.width/2;
    let cy = canvas.height/2;

    ctx.beginPath();
    ctx.moveTo(cx, cy);

    ctx.lineTo(cx + xcoor, cy - ycoor);
    ctx.stroke();
}

function drawSquare(color) {
    ctx.fillStyle = color;
    ctx.fillRect(0, 0, 400, 400);
}

function clearVector() {
    ctx.clearRect(0, 0, 400, 400);
}

function clearCanvas() {
    clearVector();
    drawSquare('black');
}

function handleDrawEvent() {
    clearCanvas();
    let v1x = document.getElementById("v_onex").value;
    let v1y = document.getElementById("v_oney").value;

    let v2x = document.getElementById("v_twox").value;
    let v2y = document.getElementById("v_twoy").value;

    var v1 = new Vector3([v1x, v1y, 0]);
    drawVector(v1, "red");

    var v2 = new Vector3([v2x, v2y, 0]);
    drawVector(v2, "blue");
}

function angleBetween(v1, v2) {
    var dotProduct = Vector3.dot(v1, v2);

    var magV1 = v1.magnitude();
    var magV2 = v2.magnitude();
    
    // calculate the angle between v1 and v2 using the arc_cosine function
    var angle = Math.acos(dotProduct / (magV1 * magV2)) * (180 / Math.PI);

    //return the angle in between the vectors
    return angle;

}

function areaTriangle(v1, v2) {
    var area = (v1.magnitude() * v2.magnitude()) / 2;
    return area;
}

function handleDrawOperationEvent() {
// Clear the canvas.
// Read the values of the text boxes to create v1 and call drawVector(v1, "red") .  
// Read the values of the text boxes to create v2 and call drawVector(v2, "blue") .  
// Read the value of the selector and call the respective Vector3 function.
// For add and sub operations, draw a green vector v3 = v1 + v2  or v3 = v1 - v2. For mul and div operations, draw two green vectors v3 = v1 * s and v4 = v2 * s.
    clearCanvas();

    var v1x = document.getElementById("v_onex").value;
    var v1y = document.getElementById("v_oney").value;

    var v2x = document.getElementById("v_twox").value;
    var v2y = document.getElementById("v_twoy").value;

    var v1 = new Vector3([v1x, v1y, 0]);
    drawVector(v1, "red");

    var v2 = new Vector3([v2x, v2y, 0]);
    drawVector(v2, "blue");

    let operation = document.getElementById("operation").value;

    let scalar = document.getElementById("scalar").value;

    if (operation === "add") {
        drawVector(v1.add(v2), "green");
    }

    if (operation === "sub") {
        drawVector(v1.sub(v2), "green");
    }

    if (operation === "div") {
        drawVector(v1.div(scalar), "green");
        drawVector(v2.div(scalar), "green");
    }

    if (operation === "mul") {
        drawVector(v1.mul(scalar), "green");
        drawVector(v2.mul(scalar), "green");
    }

    if (operation === "mag") {
        console.log("Magnitude v1: " + v1.magnitude());
        console.log("Magnitude v2: " + v2.magnitude());
    }

    if (operation === "norm") {
        drawVector(v1.normalize(), "green");
        drawVector(v2.normalize(), "green");
    }

    if (operation === "angle") {
        console.log("Angle: " + angleBetween(v1, v2));
    }

    if (operation === "area") {
        console.log("Area of triangle: " + areaTriangle(v1, v2));
    }
}
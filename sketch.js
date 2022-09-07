let canvas = document.querySelector('canvas');
let context = canvas.getContext('2d');

let size = window.innerWidth;
let dpr = window.devicePixelRatio;
canvas.width = size * dpr;
canvas.height = size * dpr;
context.scale(dpr, dpr);
context.lineWidth = 4;

var finalSize = 3;
var startSteps;
var startStepsInit = 8;
var offset = 2;
var tileStep = (size - offset * 2) / 7;
var startSize = tileStep;
var directions = [-1, 0, 1];


function draw(x, y, width, height, xMovement, yMovement, steps) {
	context.beginPath();
	context.rect(x, y, width, height);
	context.stroke();

	if (steps >= 0) {
		let newSize = (startSize) * (steps / startSteps) + finalSize;
		let newX = x + (width - newSize) / 2;
		let newY = y + (height - newSize) / 2;

		newX = newX - ((x - newX) / (steps + 2)) * xMovement
		newY = newY - ((y - newY) / (steps + 2)) * yMovement

		draw(newX, newY, newSize, newSize, xMovement, yMovement, steps - 1);
	}
}

for (var x = offset; x < size - offset; x+= tileStep) {
	for( var y = offset; y < size - offset; y += tileStep) {
		startSteps = startStepsInit + Math.ceil(Math.random() * 3);
		var xDirection = directions[Math.floor(Math.random() * directions.length)]
		var yDirection = directions[Math.floor(Math.random() * directions.length)]
		draw(x, y, startSize, startSize, xDirection, yDirection, startSteps - 1);
	}
}
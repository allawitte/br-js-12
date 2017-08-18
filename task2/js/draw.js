'use strict';
var width, height;
const canvas = document.getElementById('draw');
const ctx = canvas.getContext('2d');
const hslMax = 359;
const hslMin = 0;
const thickMin = 5;
const thickMax = 100;

let thick, color;
startCanvas();

document.addEventListener('mousedown', setLine);
document.addEventListener('mouseup', stopDraw);
document.addEventListener('dblclick', clear);
window.addEventListener('resize', startCanvas);

function startCanvas() {
    width = window.innerWidth;
    height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;
    clear();
    thick = thickMax - 1;
    color = getRandomInt(hslMin, hslMax);
}

function getLine(min, max, current, key) {
    if (!key) {
        if (current < max) {
            current++
        }
        else {
            current = min;
        }
        return current;
    }
    else {
        if (current > min) {
            current--
        }
        else {
            current = max;
        }
        return current;
    }

}


function getRandomInt(min, max) {
    let rand = min + Math.random() * (max + 1 - min);
    rand = Math.floor(rand);
    return rand;
}

function clear() {
    ctx.clearRect(0, 0, width, height);
}

function stopDraw() {
    document.removeEventListener('mousemove', draw);
}

function setLine(e) {
    ctx.beginPath();
    ctx.strokeStyle = 'hsl(' + color + ',100%,50%)';
    document.addEventListener('mousemove', draw);
    thick = getLine(thickMin, thickMax, thick, e.shiftKey);
    color = getLine(hslMin, hslMax, color, e.shiftKey);
}
function draw(e) {
    let x = e.offsetX;
    let y = e.offsetY;
    ctx.lineTo(x, y);
    ctx.lineJoin = 'round';
    ctx.lineCap = 'round';
    ctx.lineWidth = thick;
    ctx.stroke();
}

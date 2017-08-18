'use strict';
var width, height;
const canvas = document.getElementById('draw');
const ctx = canvas.getContext('2d');
const hslMax = 359;
const hslMin = 0;
const thickMin = 5;
const thickMax = 100;
var thickDirection = false;

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
function changeLineWidth(min, max, current){
    if(thickDirection){
        if (current < max) {
            current++
        }
        else {
            thickDirection = !thickDirection;
        }
    }

    else {
        if(current > min){
            current --;
        }
        else {
            thickDirection = !thickDirection;
        }
    }
    return current;
}

function getLine(min, max, current, key) {
    if (!key) {
        return changeLineWidth(min, max, current);
    }
    else {
        thickDirection = !thickDirection;
        return changeLineWidth(min, max, current);
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

function setLineProperty(e){
    ctx.strokeStyle = 'hsl(' + color + ',100%,50%)';
    thick = getLine(thickMin, thickMax, thick, e.shiftKey);
    color = getLine(hslMin, hslMax, color, e.shiftKey);
    console.log('color', color);
    console.log('thick', thick);
}

function setLine(e) {
    ctx.beginPath();
    document.addEventListener('mousemove', draw);
    thick = getLine(thickMin, thickMax, thick, e.shiftKey);
    setLineProperty(e)
}
function draw(e) {
    let x = e.offsetX;
    let y = e.offsetY;
    ctx.lineTo(x, y);
    ctx.lineJoin = 'round';
    ctx.lineCap = 'round';
    setLineProperty(e);
    ctx.lineWidth = thick;
    ctx.stroke();
}

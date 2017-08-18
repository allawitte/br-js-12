'use strict';

const canvas = document.getElementById('wall');
const width = window.innerWidth;
const height = window.innerHeight;
const Objects = 100;
const crosses = [];
const rings = [];
canvas.width = width;
canvas.height = height;

const ctx = canvas.getContext('2d');
const sizeMin = 0.1;
const sizeMax = 0.6;

for (let i = 0; i < Objects; i++) {
    crosses.push({
        x: getRandomInt(20, width - 20),
        y: getRandomInt(20, height - 20),
        size: getRandomFloat(sizeMin, sizeMax) * 20,
        angle: getRandomInt(0, 360)
    });

    rings.push({
        x: getRandomInt(20, width - 20),
        y: getRandomInt(20, height - 20),
        size: getRandomFloat(sizeMin, sizeMax) * 12
    });
}


function nextPoint(x, y, time) {
    return {
        x: x + Math.sin((50 + x + (time / 10)) / 100) * 3,
        y: y + Math.sin((45 + x + (time / 10)) / 100) * 4
    };
}

function getRandomInt(min, max) {
    let rand = min + Math.random() * (max + 1 - min);
    rand = Math.floor(rand);
    return rand;
}


function getRandomFloat(min, max) {
    min = min * 10;
    max = max * 10;
    let rand = min + Math.random() * (max + 1 - min);
    rand = Math.floor(rand);
    return rand / 10;
}

function makeRing(x = 100, y = 100, size = 20) {
    ctx.beginPath();
    ctx.arc(x, y, size, 0, 2 * Math.PI);
    ctx.lineWidth = 1;
    ctx.strokeStyle = '#ffffff';
    ctx.stroke();
}


function makeCross(x = 100, y = 100, size = 20, angle = 10) {
    var diff = nextPoint(x, y, Date.now());
    var dx = diff.x;
    var dy = diff.y;
    if (angle) {
        angle = angle * ( Math.PI / 180 );
        ctx.save();
        ctx.translate(dx, dy);
        ctx.rotate(angle);
        ctx.translate(-dx, -dy);
    }
    ctx.beginPath();
    ctx.moveTo(x, y - size / 2);
    ctx.lineTo(x, y + size / 2);
    ctx.moveTo(x - size / 2, y);
    ctx.lineTo(x + size / 2, y);
    ctx.lineWidth = 1;
    ctx.strokeStyle = '#ffffff';
    ctx.stroke();

    if (angle) {
        ctx.restore();
    }

}

setInterval(function () {
    ctx.clearRect(0, 0, width, height);
    crosses.forEach(item => {
        makeCross(item.x, item.y, item.size, item.angle);
        item.angle += getRandomFloat(-0.2, 0.2);
    });
    rings.forEach(item => {
        makeRing(item.x, item.y, item.size);
        let coords = nextPoint(item.x, item.y, Date.now());
        item.x = coords.x;
        item.y = coords.y;
    });
}, 60);
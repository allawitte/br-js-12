const canvas = document.querySelector('canvas');
const skyWidth = canvas.width;
const skyHeight = canvas.height;
const ctx = canvas.getContext('2d');
const starsColors = ['#ffffff', '#ffe9c4', '#d4fbff'];
const starBrightness = {
    min: 0.8,
    max: 1
};

const starSize = {
    min: 0,
    max: 1.1
};
const starsFromTo = {
    min: 200,
    max: 400
};

window.addEventListener('load', createSky);
document.addEventListener('click', createSky);

function getBrightness(){
    return getRandomFloat(starBrightness.min, starBrightness.max);
}

function getColor(){
    return starsColors[getRandomInt(0, starsColors.length - 1)];
}

function getRandomInt(min, max){
    let rand = min + Math.random() * (max + 1 - min);
    rand = Math.floor(rand);
    return rand;
}

function getRandomFloat(min, max){
    min = min*10;
    max = max*10;
    let rand = min + Math.random() * (max + 1 - min);
    rand = Math.floor(rand);
    return rand/10;
}

function getStarCenter(){
    return {
        x: getRandomInt(0, skyWidth),
        y: getRandomInt(0, skyHeight)
    }
}

function getRadius(){
    return getRandomFloat(starSize.min, starSize.max);
}

function createSky(){
    ctx.clearRect(0, 0, skyWidth, skyHeight);

    let starsAmount = getRandomInt(starsFromTo.min, starsFromTo.max);
    for(let i = 0; i < starsAmount; i ++){
        ctx.beginPath();
        let center = getStarCenter();
        ctx.arc(center.x,center.y,getRadius(),0,2*Math.PI);
        ctx.globalAlpha=getBrightness();
        ctx.fillStyle = getColor();
        ctx.fill();
    }

}
/**
 * Created by Alla on 8/16/2017.
 */

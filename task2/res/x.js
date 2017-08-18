'use strict';

const mysteriousUrls = [
    'https://neto-api.herokuapp.com/food/42',
    'https://neto-api.herokuapp.com/food/42/rating',
    'https://neto-api.herokuapp.com/food/42/consumers'
];
const buzzesOfArseny = ['firstBuzzOfArseny', 'secondBuzzOfArseny', 'thirdBuzzOfArseny'];

const addScript = (url, fName) => {
    let emulatedUrl = `${url}?callback=${fName}`;
    let scr = document.createElement('script');
    scr.src = emulatedUrl;
    document.head.appendChild(scr);
};

buzzesOfArseny.forEach((item, i) => {addScript(mysteriousUrls[i], item)});

let firstBuzzOfArseny = (data) => {
    const cov = document.querySelector('.cover');
    cov.style.backgroundImage = `url(${data.pic})`;
    cov.querySelector('font').textContent = data.title;
    const forIngredients = [...document.querySelector('.content tbody').firstElementChild.children].find(item => item.hasAttribute('data-ingredients'));
    forIngredients.textContent += ' ' + data.ingredients.join(', ');
};

let secondBuzzOfArseny = (data) => {
    let r;
    const forRatings = document.querySelector('.content tbody').children[0].lastElementChild.children;
    [...forRatings].forEach(item => {
        if (item.hasAttribute('data-rating')) {
            item.textContent = data.rating.toFixed(2);
            r = item.textContent;
        }
        else if (item.hasAttribute('data-votes')) {
            item.textContent = `(${data.votes} оценок)`;
        }
        else if (item.firstElementChild && item.firstElementChild.hasAttribute('data-star')) {
            item.firstElementChild.style.width = parseFloat(r) * 10 + '%';
        }
    });
};

let thirdBuzzOfArseny = (data) => {
    const forConsumers = document.querySelector('.content tbody .consumers');
    forConsumers.innerHTML = data.consumers.reduce((memo, item) => {
            return memo + `<img src="${item.pic}" title="${item.name}">`
        }, '') + `<span>(+${data.total - data.consumers.length})</span>`;
};
/**
 * Created by Alla on 8/16/2017.
 */

const hourHand = document.querySelector('.hour-hand');
const minuteHand = document.querySelector('.minute-hand');
const secondHand = document.querySelector('.second-hand');

function setTime(){

    const now = new Date();

    const second = now.getSeconds();
    const secondsDegrees = (second/60 * 360) + 90;
    secondHand.style.transform = `rotate(${secondsDegrees}deg)`;

    const minute = now.getMinutes();
    const minutesDegrees = (minute/60 * 360) + (second/60 * 6) + 90;
    minuteHand.style.transform = `rotate(${minutesDegrees}deg)`;

    const hour = now.getHours();
    const hoursDegrees = (hour/12 * 360) + (minute/60 * 30) + 90;
    hourHand.style.transform = `rotate(${hoursDegrees}deg)`;

}

setInterval(setTime,1000);

setTime();
const time = document.getElementById('time');
const timeformat = document.getElementById('timeformat');

document.addEventListener('DOMContentLoaded', ()=> {

    setInterval(showTime, 1000);
});

const showTime = () => {
    let date = new Date();

    let hr = date.getHours();
    let min = date.getMinutes();
    let sec = date.getSeconds();

    hr = hr<10 ? `0${hr}` : hr;
    min = min<10 ? `0${min}` : min;
    sec = hr<10 ? `0${sec}` : sec;
    
    time.innerHTML = `${hr} : ${min} : ${sec}`;

    timeformat.innerHTML = hr>12 ? "PM" : "AM";
    //console.log("hours " + hr + " min: " + min + " sec: " + sec);
}
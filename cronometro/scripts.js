let hr = min = sec = ms = "0" + 0, startTimer;

const startbtn = document.querySelector(".start"),
    stopbtn = document.querySelector(".stop"),
    resetbtn = document.querySelector(".reset");

startbtn.addEventListener("click",start);
stopbtn.addEventListener("click",stop);
resetbtn.addEventListener("click",reset);



function start () {
    startbtn.classList.add("active");
    stopbtn.classList.remove("stopActive");

    startTimer = setInterval(() =>{

        ms++;
        ms = ms < 10 ? "0" + ms : ms;
        if (ms==100) {
            sec++;
            sec = sec > 10 ? "0" + sec : sec;
            ms = "0" + 0;
        }
        if (sec==60) {
            min++;
            min = min > 10 ? "0" + min : min;
            sec = "0" + 0;
        }
        if (min==60) {
            hr++;
            hr = hr < 10 ? "0" + hr : hr;
            min = "0" + 0;
        }
        putValue();
        
    },10);

}

function stop() {
    startbtn.classList.remove("active");
    stopbtn.classList.remove("stopActive");
    clearInterval(startTimer);
}




function reset() {
    startbtn.classList.remove("active");
    stopbtn.classList.remove("stopActive");
    clearInterval(startTimer);
    hr = min = sec = ms = "0" + 0;
    putValue();
}

function putValue() {

    document.querySelector('.milisecond').innerHTML = ms;
    document.querySelector(".second").innerHTML = sec;
    document.querySelector(".minute").innerHTML = min;
    document.querySelector(".hour").innerHTML = hr;

}

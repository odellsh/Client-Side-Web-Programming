function updateTime(){
    let currentDate = new Date();
    let hours = currentDate.getHours();
    let minutes = currentDate.getMinutes();
    let secs = currentDate.getSeconds();

    if(minutes < 10){
        minutes = "0" + minutes;
    }
    if(hours < 10){
        hours = "0" + hours;
    }
    if(secs < 10){
        secs = "0" + secs;
    }
    
    let th = document.getElementById("timeheader");
    th.innerHTML = hours + ":" + minutes + ":" + secs;
    setTimeout("updateTime();", 1000);
}
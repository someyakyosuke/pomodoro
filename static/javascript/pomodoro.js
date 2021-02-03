var start = document.getElementById('start');
//var stop = document.getElementById('stop');
var reset = document.getElementById('reset');
//work時間と休憩時間の切り替えフラグ
var timeflg = 0;
//ポモドーロのカウンター
var count = 0;

var min=15
var sec=0

var minutes = document.getElementById('minutes');
var seconds= document.getElementById('seconds');

//store a reference to a timer variable
var startTimer;

start.addEventListener('click', function(){
    if(startTimer === undefined){
        start.innerHTML="stop"
        startTimer = setInterval(timer, 1000)
    } else {
       stopInterval()
       startTimer = undefined;
       start.innerHTML="start"
    }
})

reset.addEventListener('click', function(){
    start.innerHTML="start"
    minutes.innerText = 15;
    seconds.innerText = "00";
  //document.getElementById('counter').innerText = 0;
    stopInterval()
    startTimer = undefined;
})




//Start Timer Function
function timer(){
   
    //Work Timer Countdown
    if(sec != 0){
        sec--;
        if(sec<10){
          seconds.innerText = "0" + sec;
        }else{
          seconds.innerText = sec;
        }
    } else if(minutes.innerText != 0 && seconds.innerText == 0){
        sec = 59;
        seconds.innerText = 59;
        minutes.innerText--;
    }

    

    //Increment Counter by one if one full cycle is completed
    if(minutes.innerText == 0 && seconds.innerText == "00"){
        if(timeflg==0){
            if(count==4){
                minutes.innerText = 25;
                seconds.innerText = "00";
                timeflg = 1;
            }else{
                minutes.innerText = 5;
                seconds.innerText = "00";
                timeflg = 1;
            }
        }else{
            minutes.innerText = 15;
            seconds.innerText = "00";
            timeflg = 0;
            count++;
        }
        //document.getElementById('counter').innerText++;
    }
}

//Stop Timer Function
function stopInterval(){
    clearInterval(startTimer);
}

//ここから図形の描画
onload = function() {
    draw();
  };
   
  function draw() {
    var canvas = document.getElementById('rectangle');
    const dpr = window.devicePixelRatio || 1;
    width = window.innerWidth;
    height = window.innerHeight;

    canvas.width = width*dpr;
    canvas.height = height*dpr;
    if ( ! canvas || ! canvas.getContext ) {
      return false;
    }
    var cvs = canvas.getContext('2d');
   
    /* rectangle */
    cvs.strokeStyle = "blue";
    cvs.lineWidth = 20;
    cvs.beginPath(); /* 図形を描き始めることを宣言 */
    cvs.scale(1,.45);
    cvs.arc(900, 640, 580, 0 * Math.PI / 180, 360 * Math.PI / 180, false);
    cvs.closePath(); /* 描いた線を閉じる */
    cvs.stroke(); /* 描いた図形を線で表示させる */
  }
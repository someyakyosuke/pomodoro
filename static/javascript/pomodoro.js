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

//楕円アニメーション用の変数
var canvas = document.getElementById('rectangle');
var cvs = canvas.getContext('2d');
var openradius = 0;

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
    timeflg = 0;
    start.innerHTML="start";
    minutes.innerText = 15;
    min=15;
    seconds.innerText = "00";
    sec=0;
  //document.getElementById('counter').innerText = 0;
    stopInterval();
    startTimer = undefined;
    openradius = 0;
    draw();
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
    } else if(minutes.innerText != 0 && sec == 0){
        sec = 59;
        seconds.innerText = 59;
        min--;
        if(min<10){
            minutes.innerText = "0" + min
        }else{
           minutes.innerText = min;
        }
    }
    //楕円のアニメーション設定
    circle();
    

    //Increment Counter by one if one full cycle is completed
    if(minutes.innerText == 0 && sec == 0){
        if(timeflg==0){
            if(count==3){
                minutes.innerText = 25;
                min=25;
                seconds.innerText = "00";
                sec=0;
                timeflg = 2;
                count=0;
                documents.getElementById("pomodorotimer").style.opacity = "0.5" ;
            }else{
                minutes.innerText = "05";
                min=5;
                seconds.innerText = "00";
                sec=0;
                timeflg = 1;
                documents.getElementById("pomodorotimer").style.opacity = "0.5" ;
            }
            if(document.getElementById("exampleModalCenter") != null){
                stopInterval();
                startTimer = undefined;
                $('#exampleModalCenter').modal();
            }
        }else{
            minutes.innerText = 15;
            min=15;
            seconds.innerText = "00";
            sec=0;
            timeflg = 0;
            documents.getElementById("pomodorotimer").style.opacity = "0.8" ;
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
    

    canvas.width = 1822;
    canvas.height = 796;
    if ( ! canvas || ! canvas.getContext ) {
      return false;
    }
    
    /* rectangle */
    cvs.strokeStyle = "yellow";
    cvs.lineWidth = 20;
    cvs.beginPath(); /* 図形を描き始めることを宣言(楕円) */
    cvs.scale(1,.45);
    cvs.arc(910, 640, 580, openradius * Math.PI / 180, 360 * Math.PI / 180, false);
    cvs.stroke(); /* 描いた図形を線で表示させる */
    cvs.strokeStyle = "#7fff00";
    cvs.lineWidth = 10;
    cvs.beginPath(); /* 図形を描き始めることを宣言(楕円) */
    cvs.arc(910, 640, 560, 0 * Math.PI / 180, 360 * Math.PI / 180, false);
    cvs.stroke(); /* 描いた図形を線で表示させる */
    cvs.beginPath(); /* 図形を描き始めることを宣言(楕円) */
    cvs.arc(910, 640, 600, 0 * Math.PI / 180, 360 * Math.PI / 180, false);
    cvs.stroke(); /* 描いた図形を線で表示させる */
  }

  function circle(){
    cvs.clearRect(0,0,1822,796);
    if(openradius==(360)){
        openradius == 0;
    }else{
        if(timeflg==0){
            //15分×60秒
            openradius = openradius + (360/(15*60));
        }else if(timeflg==1){
            //5分×60秒
            openradius = openradius + (360/(5*60));
        }else{
            //25分×60秒
            openradius = openradius + (360/(25*60));
        }
    }
    draw();
  }

  //モーダルの処理
  //$('#exampleModalCenter').on('shown.bs.modal', function () {
    //$('#myInput').trigger('focus')
  //})

  //モーダルを閉じてポモドーロ再開用の記述
  function modalbutton(){
    $('#exampleModalCenter').modal('hide');
    startTimer = setInterval(timer, 1000);
  }

  //モーダルで送信を押したときの内部ajaxの記述
  $(document).ready(function(){
    var $myForm = $('.my-ajax-form')
    $myForm.submit(function(event){
        event.preventDefault()
        var $formData = $(this).serialize()
        var $thisURL = $myForm.attr('data-url') || window.location.href // or set your own url
        console.log($formData)
        console.log($thisURL)

        $.ajax({
            method: "POST",
            url: $thisURL,
            data: $formData,
            success: handleFormSuccess,
            error: handleFormError,
        })
        
        
        $('#exampleModalCenter').modal('hide');
        
        startTimer = setInterval(timer, 1000);
    })

    function handleFormSuccess(data, textStatus, jqXHR){
        console.log(data)
        console.log(textStatus)
        console.log(jqXHR)
        $(".messages").append('<li class="alertsuccess alert-success" id="message_ajax">' + data + '</li>');
        setTimeout("$('#message_ajax').fadeOut('slow').queue(function(){this.remove()})", 3000)
        //setTimeout("$('.messages').fadeOut('slow').queue(function(){this.remove()})", 3000);
    }

    function handleFormError(jqXHR, textStatus, errorThrown){
        console.log(jqXHR)
        console.log(textStatus)
        console.log(errorThrown)
    }
    
});
    //メッセージタグが時間がたつと消えるように設定
$(function(){
    setTimeout("$('.default_message').fadeOut('slow').queue(function(){this.remove()})", 3000)
})

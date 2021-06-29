var start = document.getElementById('start');
//var stop = document.getElementById('stop');
var reset = document.getElementById('reset');
//work時間と休憩時間の切り替えフラグ
var timeflg = 0;
//ポモドーロのカウンター
var count = 0;


//ポモドーロタイマーの時間
var minutes = document.getElementById('minutes');
var seconds= document.getElementById('seconds');
var opa = document.getElementById('pomodorotimer');

//ポモドーロ設定画面の時間変数
let timer_minutes = document.getElementById("timer_minutes").value;
let kyukei=document.getElementById("timer_kyukei").value;
let tyokyukei=document.getElementById("timer_tyokyukei").value;

var min=timer_minutes;
var sec=0;
if(timer_minutes<10){
    minutes.innerText = "0" + timer_minutes;
}else{
    minutes.innerText = timer_minutes;
}
//タイマーの時間変更timer_okを押したときの処理
$("#timer_ok").click(function(){
    timer_minutes = document.getElementById("timer_minutes").value;
    kyukei = document.getElementById("timer_kyukei").value;
    tyokyukei = document.getElementById("timer_tyokyukei").value;
    if(document.getElementById("modal_minutes")!=null){
        document.getElementById("modal_minutes").innerText=timer_minutes;
    }
    
    if(timer_minutes<10){
        minutes.innerText = "0" + timer_minutes;
    }else{
        minutes.innerText = timer_minutes;
    }
    
    min=timer_minutes;
    $( '#settei' ).slideToggle() ;

    //resetをコピー
    timeflg = 0;
    start.innerHTML="start";
    seconds.innerText = "00";
    sec=0;
    opa.style.opacity = 1;
  //document.getElementById('counter').innerText = 0;
    stopInterval();
    startTimer = undefined;
    openradius = 0;
    draw();
})
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
    if(timer_minutes>9){
        minutes.innerText = timer_minutes;
    }else{
        minutes.innerText = "0" + timer_minutes;
    }
    
    min=timer_minutes;
    seconds.innerText = "00";
    sec=0;
    opa.style.opacity = 1;
    count=0;
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
    if(minutes.innerText == "00" && sec == 0){
        if(timeflg==0){
            if(count==3){
                minutes.innerText = tyokyukei;
                min=tyokyukei;
                seconds.innerText = "00";
                sec=0;
                timeflg = 2;
                count=0;
                opa.style.opacity = 0.5;
            }else{
                if(kyukei<10){
                    minutes.innerText = "0" + kyukei;
                }else{
                    minutes.innerText = kyukei;
                }
                
                min=kyukei;
                seconds.innerText = "00";
                sec=0;
                timeflg = 1;
                opa.style.opacity = 0.5;
            }
            if(document.getElementById("exampleModalCenter") != null){
                stopInterval();
                startTimer = undefined;
                $('#exampleModalCenter').modal();
            }
        }else{
            if(timer_minutes<10){
                minutes.innerText = "0" + timer_minutes;
            }else{
                minutes.innerText = timer_minutes;
            }
            min=timer_minutes;
            seconds.innerText = "00";
            sec=0;
            timeflg = 0;
            opa.style.opacity = 1;
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
    cvs.lineWidth = 9;
    cvs.beginPath(); /* 図形を描き始めることを宣言(楕円) */
    cvs.scale(1,.4);
    cvs.arc(990, 570, 500, openradius * Math.PI / 180, 360 * Math.PI / 180, false);
    cvs.stroke(); /* 描いた図形を線で表示させる */
    cvs.strokeStyle = "#7fff00";
    cvs.lineWidth = 10;
    cvs.beginPath(); /* 図形を描き始めることを宣言(楕円) */
    cvs.arc(990, 570, 490, 0 * Math.PI / 180, 360 * Math.PI / 180, false);
    cvs.stroke(); /* 描いた図形を線で表示させる */
    cvs.beginPath(); /* 図形を描き始めることを宣言(楕円) */
    cvs.arc(990, 570, 510, 0 * Math.PI / 180, 360 * Math.PI / 180, false);
    cvs.stroke(); /* 描いた図形を線で表示させる */
  }

  function circle(){
    cvs.clearRect(0,0,1822,796);
    if(openradius==(360)){
        openradius == 0;
    }
    if(timeflg==0){
        //timer_minutes分×60秒
        openradius = openradius + (360/(timer_minutes*60));
    }else if(timeflg==1){
        //kyukei分×60秒
        openradius = openradius + (360/(kyukei*60));
    }else{
         //25分×60秒
        openradius = openradius + (360/(tyokyukei*60));
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

    function handleFormError(data, textStatus, errorThrown){
        console.log(data)
        console.log(textStatus)
        console.log(errorThrown)
        $(".messages").append('<li class="alertsuccess alert-success" id="message_ajax">' + data + '</li>');
        setTimeout("$('#message_ajax').fadeOut('slow').queue(function(){this.remove()})", 3000)
    }
    
});
    //メッセージタグが時間がたつと消えるように設定
$(function(){
    setTimeout("$('.default_message').fadeOut('slow').queue(function(){this.remove()})", 3000)
})


//if-thenルールの追加設定を記述
$("#appendTest").click(function(){
    
    var ift = document.getElementById('if').innerHTML;
    var if1 = document.getElementById('if1').value;
    var then = document.getElementById('then').innerHTML;
    var then1 = document.getElementById('then1').value;
    var ru = document.getElementById('ru').innerHTML;
    const list = document.createElement('li');
    list.textContent = ift + if1 + then + then1 + ru
    //このfunctionの中身を考える
    document.getElementById('if_id').prepend(list)
    
});
//設定画面を表示する
$("#haguruma").click(function(){
    $( '#settei' ).slideToggle() ;
})
 //休憩(焚火の動画を表示する）
 $("#kyukei").click(function(){

    document.getElementById("con-nav").style.display="none";
    document.getElementById("messageblock").style.display="none";
    document.getElementById("pomodorotimer").style.display="none";
    document.getElementById("kyukeigamen").style.display="block";
    document.getElementById("audio_btn").style.display="block";
    document.getElementById("audio_del").style.display="none";

    //音をだしたかったがchromeの使用上無理だったので音を出す用のボタンを新たに作成する
    //music.loop = true;
    //music.play();
    //randommusic.loop = true;
    //randommusic.play();
      
    })
    //休憩終了処理
    $("#kyukeiend").click(function(){
    document.getElementById("con-nav").style.display="block";
    document.getElementById("messageblock").style.display="block";
    document.getElementById("pomodorotimer").style.display="block";
    document.getElementById("kyukeigamen").style.display="none";
    music.pause();
    music.currentTime = 0;
    randommusic.pause();
    randommusic.currentTime = 0;
    $('audio').each(function() {
        $(this).get(0).pause();
        }); 
    })
    $('.audio_btn').on('click', function(){
        $('audio').each(function() {
        $(this).get(0).pause();
        }); $(this).prev().get(0).currentTime = 0;
        $(this).prev().get(0).play();
        document.getElementById("audio_btn").style.display="none";
        document.getElementById("audio_del").style.display="block";
    });
    $('.audio_del').on('click', function(){
        $('audio').each(function() {
        $(this).get(0).pause();
        }); 
        document.getElementById("audio_btn").style.display="block";
        document.getElementById("audio_del").style.display="none";
    });
//ifthenルールの文字の設定画面を表示する
$("#settei2").click(function(){
    $( '#if_settei' ).slideToggle() ;
})
$("#if_ok").click(function(){
    document.getElementById("if").innerHTML = document.getElementById("moshi").value
    document.getElementById("then").innerHTML = document.getElementById("tara").value
    document.getElementById("ru").innerHTML = document.getElementById("ru2").value
})
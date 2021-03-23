let day_count = 0;
const weekchars = ["日曜日","月曜日","火曜日","水曜日","木曜日","金曜日","土曜日"]

$(document).ready(function(){
  $(".btn").click(function(){
    let $url_graph = document.getElementById( "url_data" ).value || window.location.href // or set your own url;
    let button_val = $(this).val();
    let $crf_token = $('[name="csrfmiddlewaretoken"]').attr('value');
    /*月日曜日の表示を変更 */
    let month = document.getElementById("month_python");
    let day = document.getElementById("day_python");
    let youbi = document.getElementById("youbi");
    day_count += parseInt(button_val);
    /*今日の日付(日本時間）*/
    let day_ymd = new Date();
    let get_day = day_ymd.getDate();
    day_ymd.setDate(get_day + day_count)
    
    month.textContent = day_ymd.getMonth() + 1;
    day.textContent = day_ymd.getDate();
    youbi.textContent = weekchars[day_ymd.getDay()];
    /*ここからグラフの描画のためのデータ送信*/
    $.ajax({
      url: $url_graph,
      type: 'post',
      data: {
        button_value: day_count
      },
      headers:{"X-CSRFToken": $crf_token},
      success: function(response){

        /*ここからグラフの描画*/
        var graph_time = response.graph_time;
        var graph_shuutyuu = response.graph_shuutyuu;
        /* idが"graph"の要素を取得 */
        var ctx = document.getElementById("graph");

        /* 上記要素にチャートを描画　*/
        var myChart = new Chart(ctx, {
            type: 'line',
            data: {
              
              labels: graph_time,
              datasets: [
                {
                  label: '集中度(点）',
                  data: graph_shuutyuu,
                  borderColor: "rgba(0,0,255,1)",
                  backgroundColor: "rgba(0,0,0,0)"
                }
              ]
            },
            options: {
              legend: {
              display: false
              },
              title: {
                display: true,
                text: '集中度(1点～10点)'
              },
              scales: {
                xAxes: [{
                  
                  //軸ラベル表示
                  scaleLabel: {
                      display: true,
                      labelString: '時間'
                  },
                  //ここで軸に時間を設定する
                  type: 'time',
                  time: {
                      parser: 'HH:mm',
                      unit: 'hour',
                      stepSize: 1,
                      min: "00:00",
                      max: "24:00",
                      displayFormats: {
                          'hour': 'HH:mm'
                      }
                  },
                  
              }],
                yAxes: [{
                  ticks: {
                    suggestedMax: 10,
                    suggestedMin: 0,
                    stepSize: 1,
                    callback: function(value, index, values){
                      return  value
                    }
                  }
                }]
              },
            }
          });
      }
    });
  });
});
   
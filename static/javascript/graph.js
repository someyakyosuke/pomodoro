/* idが"radar-chart"の要素を取得 */
var ctx = document.getElementById("graph");

/* 上記要素にチャートを描画　*/
var myChart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: ['09:30', '11:10', '13:00', '15:00', '18:30', '22:50'],
      datasets: [
        {
          label: '集中度(点）',
          data: [],
          borderColor: "rgba(0,0,255,1)",
          backgroundColor: "rgba(0,0,0,0)"
        }
      ],
    },
    options: {
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
          //ここで軸を時間を設定する
          type: 'time',
          time: {
              parser: 'HH:mm',
              unit: 'hour',
              stepSize: 1,
              displayFormats: {
                  'hour': 'HH:mm'
              }
          },
          //X軸の範囲を指定
          ticks: {
              min: '00:00',
              max: '24:00'
          }
      }],
        yAxes: [{
          ticks: {
            suggestedMax: 40,
            suggestedMin: 0,
            stepSize: 10,
            callback: function(value, index, values){
              return  value
            }
          }
        }]
      },
    }
  });

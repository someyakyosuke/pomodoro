
//ブロックを追加したときにそれぞれ番号分けするために使う
var situmonnum = 0;
//if-thenルールの追加設定を記述
$("#appendSitumon").click(function(){
    
    var who = document.getElementById('who').value;
    var when = document.getElementById('when').value;
    var ni = "に"
    var where = document.getElementById('where').value;
    var what = document.getElementById('what').value;
    const situmonblock = document.createElement('div');
    const list = document.createElement('li');
    const maru = document.createElement('div');
    const deleteblock = document.createElement('img');
    deleteblock.src = "/static/img/outline_delete_black_24dp.png"
    deleteblock.style.width = '48px';
    deleteblock.style.height = '50px';
    deleteblock.id = 'delete' + situmonnum;
    situmonblock.id = 'situmonblock' + situmonnum;
    situmonblock.className = 'situmonblock';
    maru.id = 'maru'+situmonnum;
    maru.style.width = '50px';
    maru.style.height = '50px';
    maru.style.border = '1px solid #333333';
    list.textContent = who + when + ni + where + what
    //このfunctionの中身を考える
    document.getElementById('situmon_id').prepend(situmonblock);
    document.getElementById('situmonblock'+situmonnum).prepend(deleteblock);
    document.getElementById('situmonblock'+situmonnum).prepend(maru);
    document.getElementById('situmonblock'+situmonnum).prepend(list);
    //質問型アクションの四角い枠をクリックしたときに丸マークが表示されるようにする
    //(関数をクリックしたときに新たに作成)
    document.getElementById("maru"+situmonnum).onclick = function(){
      let img_element = document.createElement('img');
      let marunum= document.getElementById(this.id);
      if(marunum.hasChildNodes()){
        marunum.lastElementChild.remove();
      }else{
        img_element.src = "/static/img/maru.png"
        marunum.appendChild(img_element);
      }
    }
    document.getElementById("delete" + situmonnum).onclick = function(){
      let deletenum = document.getElementById(this.id);
      deletenum.parentNode.remove();
    }
    situmonnum ++;
});

$(function(){     
    var d = new Date(),        
        h = d.getHours(),
        m = d.getMinutes();
    if(h < 10) h = '0' + h; 
    if(m < 10) m = '0' + m; 
    $('input[type="time"][value="now"]').each(function(){ 
      $(this).attr({'value': h + ':' + m});
    });
  });


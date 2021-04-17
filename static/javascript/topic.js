//if-thenルールの追加設定を記述
$("#appendSitumon").click(function(){
    
    var who = document.getElementById('who').value;
    var when = document.getElementById('when').value;
    var where = document.getElementById('where').value;
    var what = document.getElementById('what').value;
    const list = document.createElement('li');
    list.textContent = who + when + where + what
    //このfunctionの中身を考える
    document.getElementById('situmon_id').prepend(list)
    
});
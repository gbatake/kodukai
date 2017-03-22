//テーブルデータを領域に格納
function setdata(_year,_month,_day,_contents,_in,_out,_balance){

    this.year = _year;
    this.month = _month;
    this.day = _day;
    this.contents = _contents;
    this.in = _in;
    this.out = _out;
    this.balance = _balance;

};

//CSVファイル読み込み
function getCSV(){
    var req = new XMLHttpRequest();
    req.open("get", "sample.csv", true);
    req.send(null);
	
    req.onload = function(){
	convertCSVtoArray(req.responseText); // 渡されるのは読み込んだCSVデータ
    }
}

//読み込んだCSVデータを展開し、テーブルを作成
function convertCSVtoArray(str){ 
    var result = [];
    var linedata = str.split("\n");
    var data = [];
    var table = document.getElementById('editTbl');

    // 各行ごとにカンマで区切った文字列を要素とした二次元配列を生成
    for(var i=0;i<linedata.length;++i){
        result[i] = linedata[i].split(',');

        data[i] = new setdata(result[i][0],
                              result[i][1],
                              result[i][2],
                              result[i][3],
                              result[i][4],
                              result[i][5],
                              result[i][6]
                             );

        if(i!=linedata.length-1)
        {
            // 行を行末に追加
            var row = table.insertRow(-1);
            
            //テーブル追加
            var cell1 = row.insertCell(-1);
            var cell2 = row.insertCell(-1);
            var cell3 = row.insertCell(-1);
            var cell4 = row.insertCell(-1);
            var cell5 = row.insertCell(-1);
            var cell6 = row.insertCell(-1);
            var cell7 = row.insertCell(-1);
            var cell8 = row.insertCell(-1);
            var cell9 = row.insertCell(-1);
            cell1.innerHTML = "<td><span backcolor ='red'>"+(i+1)+"</span></td>"
            cell2.innerHTML = "<td><span contenteditable='true' onblur='cursolOut(this,4);'>"+data[i].year+"</span></td>"
            cell3.innerHTML = "<td><span contenteditable='true' onblur='cursolOut(this,2);'>"+data[i].month+"</span></td>"
            cell4.innerHTML = "<td><span contenteditable='true' onblur='cursolOut(this,2);'>"+data[i].day+"</span></td>"
            cell5.innerHTML = "<td><span contenteditable='true'>"+data[i].contents+"</span></td>"
            cell6.innerHTML = "<td><span contenteditable='true' onblur='cursolOut(this,0);'>"+data[i].in+"</span></td>"
            cell7.innerHTML = "<td><span contenteditable='true' onblur='cursolOut(this,0);'>"+data[i].out+"</span></td>"
            cell8.innerHTML = "<td><span >"+data[i].balance+"</span></td>"
            cell9.innerHTML = "<input type='button' value='削除' onclick='OnDelButtonClick(this);'/>"
        }
    }
}

//画面起動時処理
window.onload = function(){
    getCSV();
}

//プラスボタン押下時処理
function OnAddButtonClick(id){

    // テーブル取得
    var table = document.getElementById(id);

    // 行を行末に追加
    var row = table.insertRow(-1);

    // セルの挿入
    var cell1 = row.insertCell(-1);
    var cell2 = row.insertCell(-1);
    var cell3 = row.insertCell(-1);
    var cell4 = row.insertCell(-1);
    var cell5 = row.insertCell(-1);
    var cell6 = row.insertCell(-1);
    var cell7 = row.insertCell(-1);
    var cell8 = row.insertCell(-1);
    var cell9 = row.insertCell(-1);
    cell1.innerHTML = "<td><span backcolor ='red'>"+(table.rows.length-1)+"</span></td>"
    cell2.innerHTML = "<td><span contenteditable='true' onblur='cursolOut(this,4);'>2017</span></td>"
    cell3.innerHTML = "<td><span contenteditable='true' onblur='cursolOut(this,2);'></span></td>"
    cell4.innerHTML = "<td><span contenteditable='true' onblur='cursolOut(this,2);'></span></td>"
    cell5.innerHTML = "<td><span contenteditable='true'></span></td>"
    cell6.innerHTML = "<td><span contenteditable='true' onblur='cursolOut(this,0);'></span></td>"
    cell7.innerHTML = "<td><span contenteditable='true' onblur='cursolOut(this,0);'></span></td>"
    cell8.innerHTML = "<td><span></span></td>"
    cell9.innerHTML = "<input type='button' value='削除' onclick='OnDelButtonClick(this);'/>"
}

//calcボタン押下時処理
function OnCalcButtonClick(id){

    var msgArea = document.getElementById("msgArea");
    msgArea.style.color = "red";

    var data1 = [];
    var datawork = [];
    var table = document.getElementById(id);

    datawork = new setdata("","","","","","","");

    var datacount = table.rows.length;

    //テーブルデータ取得
    for(i=1; i<datacount; i++){
        data1[i] = new setdata(table.rows[i].cells[1].innerText,
                              table.rows[i].cells[2].innerText,
                              table.rows[i].cells[3].innerText,
                              table.rows[i].cells[4].innerText,
                              Number(table.rows[i].cells[5].innerText),
                              Number(table.rows[i].cells[6].innerText),
                              Number(table.rows[i].cells[7].innerText)
                             );
    }

    //入力チェック
    for(i=1; i<datacount; i++)
    {
        //年
        if(data1[i].year == "")
        {
             msgArea.innerText = i + "行目：年の入力がありません。";
             return;
        }

        //月
        if(data1[i].month == "")
        {
             msgArea.innerText = i + "行目：月の入力がありません。";
             return;
        }

        //日
        if(data1[i].day == "")
        {
             msgArea.innerText = i + "行目：日の入力がありません。";
             return;
        }

        //内容
        if(data1[i].contents == "")
        {
             msgArea.innerText = i + "行目：内容の入力がありません。";
             return;
        }

        //収入・支出
        if(data1[i].in == "" && data1[i].out == "")
        {
             msgArea.innerText = i + "行目：収入・支出の入力がありません。";
             return;
        }
        if(data1[i].in != "" && data1[i].out != "")
        {
             msgArea.innerText = i + "行目：収入・支出は一方しか入力できません。";
             return;
        }

    }

    //年ソート
    for(i=1;i<datacount;i++)
    {
        for(var j=datacount-1;j>i;j--)
        {
            if(Number(data1[j].year)<Number(data1[j-1].year))
            {
                datawork = data1[j];
                data1[j] = data1[j-1];
                data1[j-1] = datawork;
            }
        }
    }

    //月ソート
    for(i=1;i<datacount;i++)
    {
        for(var j=datacount-1;j>i;j--)
        {
            if(Number(data1[j].year)==Number(data1[j-1].year) && 
               Number(data1[j].month)<Number(data1[j-1].maoth))
            {
                datawork = data1[j];
                data1[j] = data1[j-1];
                data1[j-1] = datawork;
            }
        }
    }

    //日ソート
    for(i=1;i<datacount;i++)
    {
        for(var j=datacount-1;j>i;j--)
        {
            if(Number(data1[j].year)==Number(data1[j-1].year) && 
               Number(data1[j].month)==Number(data1[j-1].month) &&
                     Number(data1[j].day)<Number(data1[j-1].day))
            {
                datawork = data1[j];
                data1[j] = data1[j-1];
                data1[j-1] = datawork;
            }
        }
    }

    //残高算出
    var zandaka = 0;
    for(i=1; i<datacount; i++){
        if(i == 1){
            zandaka = data1[i].in - data1[i].out;
        }else if(data1[i].in != ""){
            zandaka += data1[i].in;
        }else{
            zandaka -= data1[i].out;
        }

        data1[i].balance = zandaka;
    }

    //テーブル削除
    for(i=1;i<datacount;i++){
        table.deleteRow(1);
    }

    //テーブル作成
    for(i=1;i<datacount;i++){
        // 行を行末に追加
        var row = table.insertRow(-1);
        
        //テーブル追加
        var cell1 = row.insertCell(-1);
        var cell2 = row.insertCell(-1);
        var cell3 = row.insertCell(-1);
        var cell4 = row.insertCell(-1);
        var cell5 = row.insertCell(-1);
        var cell6 = row.insertCell(-1);
        var cell7 = row.insertCell(-1);
        var cell8 = row.insertCell(-1);
        var cell9 = row.insertCell(-1);
        cell1.innerHTML = "<td><span backcolor ='red'>"+i+"</span></td>"
        cell2.innerHTML = "<td><span contenteditable='true' onblur='cursolOut(this,4);'>"+data1[i].year+"</span></td>"
        cell3.innerHTML = "<td><span contenteditable='true' onblur='cursolOut(this,2);'>"+data1[i].month+"</span></td>"
        cell4.innerHTML = "<td><span contenteditable='true' onblur='cursolOut(this,2);'>"+data1[i].day+"</span></td>"
        cell5.innerHTML = "<td><span contenteditable='true'>"+data1[i].contents+"</span></td>"
        cell6.innerHTML = "<td><span contenteditable='true' onblur='cursolOut(this,0);'>"+data1[i].in+"</span></td>"
        cell7.innerHTML = "<td><span contenteditable='true' onblur='cursolOut(this,0);'>"+data1[i].out+"</span></td>"
        cell8.innerHTML = "<td><span >"+data1[i].balance+"</span></td>"
        cell9.innerHTML = "<input type='button' value='削除' onclick='OnDelButtonClick(this);'/>"
    }

    for(i=1;i<datacount;i++)
    {
        console.log(data1[i].year+data1[i].month+data1[i].day);
    }

}

function numOnly(){

    m = String.fromCharCode(event.keyCode);
    if("0123456789\b\r".indexOf(m, 0) < 0){
        event.keyCode = '';
        ppp.focus();
        return false;
    }
    
    return true;
}
function cursolOut(ele, number)
{
    var msgArea = document.getElementById("msgArea");
    msgArea.style.color = "red";
    var workText = ele.innerText.split('');

    //メッセージ初期化
    msgArea.innerText = "";

    //数値チェック
    for(i=0;i<workText.length;i++)
    {
        //if(/[^\d-.]/.test(workText[i])){
        if("0123456789".indexOf(workText[i], 0) < 0){
            msgArea.innerText = "数値のみ入力可能です。";
            ele.focus();
　　　　　　return;
        }
    }

    //桁数チェック
    if(number != 0 && workText.length != number)
    {
        msgArea.innerText = number + "桁のみ入力可能です。";
        ele.focus();
        return;
    }
}

//削除ボタンクリック時処理
function OnDelButtonClick(ele)
{
    // 削除ボタンを押下された行を取得
    tr = ele.parentNode.parentNode;
    // trのインデックスを取得して行を削除する
    tr.parentNode.deleteRow(tr.sectionRowIndex);

}
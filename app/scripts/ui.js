/**
 * Created by liuyixi on 2/27/14.
 */

var UI = {
    process:function(msg){
        $('#log').html(msg);
    },
    result:function(res){
        var str = '无结果';
        if(res.length>0){
             str = UI.buildTable(res);
        }
        $('#result').html(str);
    },


    buildTable:function(data){
        var keys = [];
        var tableHtml = '<table class="table table-hover table-striped">';
        //table thead
        tableHtml +='<thead><tr><th>#</th>';
        for(var key in data[0]['key']){
            keys.push(key);
            tableHtml+='<th>'+key +'</th>';
        }
        tableHtml +='</tr></thead>';
        //table thead end;

        //table body
        tableHtml +='<tbody>';
        for(var i= 0,len=data.length;i<len;i++){
            tableHtml +='<tr><td>'+data[i]['__name']+'</td>';

            for(var k= 0,k_l = keys.length;k<k_l;k++){
                tableHtml += '<td>'+data[i]['key'][keys[k]]+'</td>';
            }

            tableHtml+='</tr>';
        }
        tableHtml +='</tbody>';
        //table body end;

        tableHtml +='</table>';

        return tableHtml;
    },

    showFiles:function(files){
        var $count = $('#fileCount');
        var $list = $('#fileListArea');
        $count.html('已选择'+files.length +'个文件：');
        var listHtml = '';
        for(var i= 0,len = files.length;i<len;i++){
            listHtml +='<h6><span class="glyphicon glyphicon-file"></span>'+files[i].name+'<small>'+files[i].content.slice(0,30)+'...</small></h6>';
        }
        $list.html(listHtml);
    },

    makeInput:function(){
        $('#keywordsInput,#keywordsInputDone').removeAttr('disabled');
        $('#keywordsInput').focus();
    },

    sendMessage:function(msg,value){
        switch (msg){
            case 'ReadFile':

                break;
            case 'ReadFileDone':
                UI.showFiles(value);
                break;
            case 'MakeInputEditable':
                UI.makeInput();
                break;
        }
    }
};
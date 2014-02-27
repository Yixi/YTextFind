/**
 * Created by liuyixi on 2/27/14.
 */

var UI = {
    process:function(msg){
        $('#log').html(msg);
    },
    result:function(res){
        var str = '';
        for(var i=0;i<res.length;i++){
            var r = res[i];
            for(var key in r){
                if(key!='__name'){
                    str += '<p>关键词<span class="text-primary">'+ key +'</span>在文件<span class="text-info">'+res[i]['__name']+'</span>中出现了' +
                        '<span class="text-danger">'+res[i][key] +'</span>次</p>'
                }
            }
        }
        $('#result').html(str);
    },


    sendMessage:function(msg,value){
        switch (msg){
            case 'ReadFile':

                break;
            case 'ReadFileDone':

                break;
        }
    }
};
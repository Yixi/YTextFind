/*global*/

var g_Files = null;

/*init*/
$(function(){
    document.getElementById('fileSelect').addEventListener('change',prepareFiles,false);
    $('#keywordsInputDone').on('click',readyToSearch);
    $('#keywordsInput').on('keydown',function(e){
        if(e.keyCode == 13){
            readyToSearch();
        }
    });
    $('#fileButton').on('click',function(){
        $('#fileSelect').click();
    });
});


function prepareFiles(e){
    UI.sendMessage('ReadFile');
    Util._readFiles(e)
        .then(function(files){
            console.log(files);
            UI.sendMessage('ReadFileDone',files);
            g_Files = files;
            UI.sendMessage('MakeInputEditable');
        })
}


function readyToSearch(){
    var keywords = $.trim($('#keywordsInput').val());
    if(keywords.length > 0 ){
        Util.searchKeyWords(keywords,g_Files)
            .then(function(res){
                UI.process('done');
                console.log(res);
                UI.result(res);
            },function(e){},function(prog){
                UI.process(prog);
            });
    }
}

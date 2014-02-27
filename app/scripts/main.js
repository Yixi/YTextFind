/*global*/

var g_Files = null;

/*init*/
$(function(){
    document.getElementById('fileSelect').addEventListener('change',prepareFiles,false);
    $('#keywordsInputDone').on('click',readyToSearch);
});


function prepareFiles(e){
    UI.sendMessage('ReadFile');
    Util._readFiles(e)
        .then(function(files){
            console.log(files);
            UI.sendMessage('ReadFileDone',files);
            g_Files = files;
        })
}


function readyToSearch(){
    var keywords = $('#keywordsInput').val();
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

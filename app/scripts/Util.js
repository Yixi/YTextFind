/**
 * Created by liuyixi on 2/27/14.
 */

var Util = {

    _readFiles:function(e){
        return new YPro(function(comp,err,prog){
            var fs = e.target.files;
            var files = [];
            var counter = 0,len=fs.length;
            if(fs){
                for(var i= 0,f; f = fs[i]; i++){
                    var r = new FileReader();
                    r.onload = (function(i,f){
                        return function(e){
                            counter++;
                            prog(counter);
                            files[i] = {
                                name: f.name,
                                type: f.type,
                                size: f.size,
                                content: e.target.result
                            };
                            if(counter == len){
                                comp(files);
                            }
                        }
                    })(i,f);
                    r.readAsText(f);
                }
            }
        });
    },

    searchKeyWords:function(keywords,files){
        return new YPro(function(comp,err,prog){
            var len = files.length;
            var result = [];
            keywords = keywords.split(' ');
            console.log(keywords);
            for(var i=0;i<len;i++){
                var lines = files[i].content.split('\n');

                result[i] = {};
                result[i]['__name'] = files[i].name;
                result[i]['key'] = {};
                for(var k= 0,k_l = keywords.length;k<k_l;k++){
                    result[i]['key'][keywords[k]] = 0;
                }

                for(var ln= 0,ln_len = lines.length;ln<ln_len;ln++){

                    prog('process file '+ files[i].name +' line '+ln);
                    var line = lines[ln];

                    for(var k= 0,k_l = keywords.length;k<k_l;k++){
                        result[i]['key'][keywords[k]] += line.split(keywords[k]).length - 1;
                    }
                }
            }
            comp(result);
        });
    }

};
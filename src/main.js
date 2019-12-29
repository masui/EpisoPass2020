//
// EpisoPassの入口
//

$ = require("./jquery.js")
editor = require("./editor.js")
episodas = require("./episodas.js")
crypt = require("./crypt.js")
dasmaker = require("./dasmaker.js")
dastemplate = require("./dastemplate.js")
easy = require("./easy.js")

data = require("./sampledata.json")

// require("./episopass.css")

lib = require("./lib.js")

let curdiv = null

if(location.search[0] == '?'){ // 引数解釈
    let pair = location.search.substring(1).split('&');
    for(var i=0; pair[i]; i++){
	var kv = pair[i].split('=');
	if(kv[0] == 'questions'){
	    questions = decodeURIComponent(kv[1]).split(/;/)
	}
	if(kv[0] == 'answers'){
	    answers = decodeURIComponent(kv[1]).split(/;/)
	}
    }
    let qas = []
    for(let i=0;i<questions.length;i++){
	let obj = {}
	obj['question'] = questions[i]
	obj['answers'] = answers
	qas.push(obj)
    }
    data = {}
    data['name'] = 'EpisoPass'
    data['seed'] = 'EpisoPassSeed01234'
    data['qas'] = qas
}

//$(window).on('load',function(){
//    //alert('onload');
//    //alert(curdiv)
//    if(curdiv){
//	alert('curdiv defined')
//	show(curdiv)
//    }
//});

editor.editor(data)

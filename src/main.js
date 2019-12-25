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

require("./episopass.css")

if(location.search[0] == '?'){
    var pair = location.search.substring(1).split('&');
    for(var i=0; pair[i]; i++){
	var kv = pair[i].split('=');
	if(kv[0] == 'questions'){
	    questions = decodeURIComponent(kv[1]).split(/;/)
	    // $('#easyquestions').val(decodeURIComponent(kv[1].split(/;/).join("\n")));
	}
	if(kv[0] == 'answers'){
	    answers = decodeURIComponent(kv[1]).split(/;/)
	    //$('#easyanswers').val(decodeURIComponent(kv[1].split(/;/).join("\n")));
	}
    }
    qas = []
    for(let i=0;i<questions.length;i++){
	let o = {}
	o['question'] = questions[i]
	o['answers'] = answers
	qas.push(o)
    }
    data = {}
    data['name'] = 'EpisoQ'
    data['seed'] = 'EpisoQSeed'
    data['qas'] = qas
}

editor.editor(data)

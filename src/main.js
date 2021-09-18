//
// EpisoPassの入口
//

$ = require("./jquery.js")
editor = require("./editor.js")
episodas = require("./episodas.js")
crypt = require("./crypt.js")
dasmaker = require("./dasmaker.js")
//easy = require("./easy.js")
episopool = require("./episopool.js")
lib = require("./lib.js")
dastemplate = require("./dastemplate.js")

data = require("./sampledata.json")
pool = require("./samplepool.json")

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

// ボタンの挙動設定
$("#descbutton").click(() => lib.lib.show('#description'))
//$("#editbutton").click(() => lib.lib.show('#editor'))
$("#editbutton").click(() => editor.editor(data))
$("#dasbutton").off() // 何度も登録されて困った
$("#dasbutton").click(() => dasmaker.dasmaker(data,[]))
$("#episopoolbutton").click(() => episopool.episopool())

lib.lib.show('#description')
// editor.editor(data)

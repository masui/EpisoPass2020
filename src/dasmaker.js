//
// EpisoDASのDASパタンを入力させてJSON生成
//

//
// DASボタンを押したときこれらの値がセーブされる
//

dasmaker = function(data,name,seed,selections){
    //console.log('dasmaker')
    //console.log(data)
    
    var mousedown = false;
    var curdiv = null; // letじゃ駄目
    
    //var width, height;
    //var qas, answers;
    //var mousediv = null;
    //var mousedown = false;
    
    var selected = [];

    var finished = false;
    
    var browserWidth = function(){  
	if(window.innerWidth){ return window.innerWidth; }  
	else if(document.body){ return document.body.clientWidth; }  
	return 0;  
    };
    
    var browserHeight = function(){  
	if(window.innerHeight){ return window.innerHeight; }  
	else if(document.body){ return document.body.clientHeight; }  
	return 0;  
    };
    
    function shuffle(array){
	//var a = array.slice()
	//console.log("shuffle init")
	//console.log(array)
	for(var i = array.length - 1; i > 0; i--){
	    var r = Math.floor(Math.random() * (i + 1));
	    //let tmp = array[i]
	    //console.log(tmp + ' + ' + array[r])
	    //array[i] = array[r]
	    //array[r] = tmp
	    [array[i], array[r]] = [array[r], array[i]]
	}
	//console.log('shuffle')
	//console.log(array)
    }
    
    function finish(){
	if(finished) return;
	finished = true;

	//console.log(selected)

	// データを複製
	var newdata = {}
	newdata['name'] = data['name']
	newdata['seed'] = data['seed']
	newdata['qas'] = [];
	for(let i = 0; i < data['qas'].length; i++){
	    let o = {};
	    o['question'] = data['qas'][i]['question']
	    // o['answers'] =  data['qas'][i]['answers'].slice(); // 配列複製
	    o['answers'] = []
	    //console.log(data['qas'][i]['answers'].length)
	    for(let j=0;j<data['qas'][i]['answers'].length;j++){
		//console.log(j + ' ' + data['qas'][i]['answers'][j])
		//o['answers'].push(data['qas'][i]['answers'][j] + '')
		o['answers'][j] = data['qas'][i]['answers'][j]
	    }
	    newdata['qas'].push(o);
	}

	//newdata = JSON.parse(JSON.stringify(data));
	
	// データをシャフル
	for(let i=0;i<selected.length;i++){
	    //console.log('=========')
	    var answers = newdata['qas'][i].answers
	    var curanswer = answers[selected[i]];
	    //console.log('curanswer = '+curanswer);
	    //console.log(selected[i])
	    //console.log(answers)
	    var rightanswer = answers[selections[i]];
	    shuffle(answers);
	    //console.log(answers)

	    // var curanswer = answers[selected[i]];
	    //console.log("curanswer = " + curanswer)
	    if(curanswer != rightanswer){
		for(var j = 0; j < answers.length; j++){
		    if(answers[j] == rightanswer){
			answers[j] = curanswer;
			answers[selected[i]] = rightanswer;
			break;
		    }
		}
	    }
	    newdata.qas[i].answers = answers
	}

	// alert('DASデータを生成しました。確認して下さい。');
	//console.log(newdata);

	lib.lib.make_html(newdata);
	episodas.episodas(newdata);
    }
    
    function initsize(){
	// width = browserWidth();
	width = $('#contents').width();
	height = browserHeight();
	for(var i=0;i<answers.length;i++){
	    div = $('#dmid'+i);
	    div.css('background-color','#fff');
	    div.css('width',width / 6.8);
	    div.css('height',height / 10);
	    div.css('font-size',width * 0.04);
	    
	    // FlexBoxでセンタリング
	    div.css('display','flex');
	    div.css('justify-content','center');
	    div.css('align-items','center');
	    
	    div.css('margin',width / 100);
	    div.css('padding',width / 100);

	    div.css('border-style','solid');
            div.css('border-radius',width*0.01);
            div.css('border-color','#000');
	    div.css('border-width','1px');
	    //div.css('box-shadow','5px 5px 4px #888');
	}
	$('#dmquestion').css('font-size',width * 0.06);
    }
    
    function mouseenter(div){
	curdiv = div;
	if(mousedown){
            curdiv.css('background-color','#f3f3f3');
	    selected.push(curdiv.attr('id').replace(/dmid/,''))
	}
    }
    
    function mouseleave(div){
	if(mousedown){
            curdiv.css('background-color','#fff');
	    
	    if(selected.length == qas.length){
		finish();
            }
	}
	curdiv = null;
    }
    
    function mousemove(e){
	//if($('#id0')[0] == undefined) return;
	if(! mousedown) return;

	var mousex = (e.pageX ? e.pageX : e.originalEvent.touches[0].pageX);
	var mousey = (e.pageY ? e.pageY : e.originalEvent.touches[0].pageY);
	for(var i=0;i<answers.length;i++){
            let buttondiv = $('#dmid'+i);
            buttonx = buttondiv.offset().left;
            buttony = buttondiv.offset().top;
            buttonw = buttondiv.width();
            buttonh = buttondiv.height();
            if(buttonx < mousex && buttonx+buttonw > mousex &&
               buttony < mousey && buttony+buttonh > mousey){
		if(!curdiv || (curdiv.attr('id') != buttondiv.attr('id'))){
                    if(curdiv){
			mouseleave(curdiv);
                    }
                    mouseenter(buttondiv);
                    curdiv = buttondiv;
		}
		return;
            }
	}
	if(curdiv){
            mouseleave(curdiv);
	}
    }
    
    function init(){
	lib.lib.show('#dasmaker')

	qas = data['qas'];
	
	//alert(`登録したいパタンで${qas.length}個のボタンを押すかなぞって下さい。`);
	
	// mousediv = null;
	mousedown = false;
	selected = [];
	
	$(window).on('resize',initsize);
	
	$('#dasmaker').children().remove();
	$('#dasmaker').on('mousemove',mousemove);
	$('#dasmaker').on('touchmove',mousemove);
	
	var center = $('<center>');
	$('#dasmaker').append(center);
	
	var qdiv = $('<div>');
	qdiv.text('DASパタンを入力して下さい');
	qdiv.height(100);
	qdiv.css('display','flex');
	qdiv.css('justify-content','center');
	qdiv.css('align-items','center');
	qdiv.attr('id','dmquestion');
	center.append(qdiv);
	center.append($('<p>'));
	
	// 回答領域
	answers = qas[0].answers; // 回答の数は同じということを仮定

	for(var i=0;i<answers.length;i++){
	    var div = $('<div>');
	    div.css('float','left');
	    div.attr('index',i);
	    div.attr('id','dmid'+i);
	    center.append(div);
	    
            div.on('mousedown',function(e){
                e.preventDefault();
                mousedown = true;
                curdiv = null;
                mousemove(e);
            });
            div.on('touchstart',function(e){
                e.preventDefault();
                mousedown = true;
                curdiv = null;
                mousemove(e);
            });
            div.on('mouseup',function(e){
                if(curdiv) mouseleave(curdiv);
                mousedown = false;
                curdiv = null;
            });
            div.on('touchend',function(e){
                if(curdiv) mouseleave(curdiv);
                mousedown = false;
                curdiv = null;
            });
	}
	
	initsize();
    }

    init();
}

exports.dasmaker = dasmaker;

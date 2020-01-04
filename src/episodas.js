episodas = function(data){
    var mousedown = false;
    var curdiv = null; // letじゃ駄目
    
    if(typeof(require) == 'undefined'){
	crypt = exports;
    }

    let browserWidth = () => {
	if(window.innerWidth){ return window.innerWidth; }  
	else if(document.body){ return document.body.clientWidth; }  
	return 0;  
    };
    
    var browserHeight = function(){  
	if(window.innerHeight){ return window.innerHeight; }  
	else if(document.body){ return document.body.clientHeight; }  
	return 0;  
    };
    
    var showQA = function(){ // n番目の問題と答リストを設定
	let len = selected.length;
	if(len < qas.length){
            let question = qas[len].question;
            $('#question').text(question);
            let answers = qas[len].answers;
            for(var i=0;i<answers.length;i++){
		$('#id'+i).text(answers[i]);
            }
	}
    };
    
    function finish(){
	// masui_secret.box.html のようなURLのときはScrapboxページに飛ぶ
	if(location.href.match(/\.box\.html$/)){
	    location.href = 'https://scrapbox.io/' + crypt.crypt(data.seed,secretstr());
	    return
	}
	$('#das').children().remove();

	if(typeof(editor) != 'undefined'){ // 編集画面のときだけHTMLデータ取得ボタン処理
	    lib.lib.make_html(data);
	}
	
	// パスワードを表示!!
	var newpass = crypt.crypt(data.seed,secretstr());
	var center = $('<center>');
	$('#das').append(center);
	
	center.append($('<p>'));
	
	// これはできないのか
	var passspan = $('<input>');
	passspan.val(newpass);
	//passspan.text(newpass);
	passspan.attr('type','text');
	passspan.css('font-size',width*0.06);
	passspan.css('border-radius',width*0.015);
	passspan.css('margin',width*0.01);
	passspan.css('padding',width*0.02);
	passspan.css('background-color','#fff');
	passspan.css('border-style','solid');
	passspan.css('border-width','1pt');
	passspan.css('border-color','#000');
	//passspan.attr('display','none');
	//passspan.hide();
	center.append(passspan);
	
	center.append($('<p>'));
	
	var show = $('<input>');
	show.attr('type','button');
	show.attr('value','表示');
	show.css('font-size',width*0.05);
	show.css('border-radius',width*0.015);
	show.css('margin',width*0.01);
	show.css('padding',width*0.02);
	show.css('background-color','#fff');
	show.css('border-style','solid');
	show.css('border-width','1pt');
	show.css('border-color','#000');
	show.click(function(event){
	    passspan.show();
	    show.hide();
	});
	center.append(show);

	var again = $('<input>');
	again.attr('type','button');
	again.attr('value','もう一度');
	again.css('font-size',width*0.05);
	again.css('border-radius',width*0.015);
	again.css('margin',width*0.01);
	again.css('padding',width*0.02);
	again.css('background-color','#fff');
	again.css('border-style','solid');
	again.css('border-width','1pt');
	again.css('border-color','#000');
	again.click(function(event){
            init();
	});
	center.append(again);

	passspan.select();
	document.execCommand("copy");
	passspan.hide();
    }
    
    secretstr = function() {
	var j, ref, results;
	return (function() {
            results = [];
            for (var j = 0, ref = qas.length; 0 <= ref ? j < ref : j > ref; 0 <= ref ? j++ : j--){ results.push(j); }
            return results;
	}).apply(this).map(function(i) {
            return qas[i].question + qas[i]['answers'][selected[i]];
	}).join('');
    };
    
    function initsize(){
	if($('#contents')[0] == undefined){
	    width = browserWidth();
	}
	else {
	    width = $('#contents').width();
	}
	height = browserHeight();
	for(var i=0;i<answers.length;i++){
            div = $('#id'+i);
            div.css('background-color','#fff');
            div.css('width',width / 6.8);
            div.css('height',height / 10);
            div.css('font-size',width * 0.03);
	    div.css('color','#000');
	    
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
            // div.css('box-shadow','5px 5px 4px #888');
	}
	$('#question').css('font-size',width * 0.05);
	$('#question').css('margin-top','10px');
    }
    
    function mouseenter(div){
	curdiv = div;
	if(mousedown){
            curdiv.css('background-color','#f3f3f3');
	    selected.push(curdiv.attr('id').replace(/id/,''))
	}
    }
    
    function mouseleave(div){
	if(mousedown){
            curdiv.css('background-color','#fff');
	    showQA();
	    
	    if(selected.length == qas.length){
		finish();
            }
	}
	curdiv = null;
    }
    
    function mousemove(e){
	if($('#id0')[0] == undefined) return;
	if(! mousedown) return;

	var mousex = (e.pageX ? e.pageX : e.originalEvent.touches[0].pageX);
	var mousey = (e.pageY ? e.pageY : e.originalEvent.touches[0].pageY);
	for(var i=0;i<answers.length;i++){
            let buttondiv = $('#id'+i);
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
    
    var init = function(){
	qas = data['qas'];
	
	curdiv = null;
	mousedown = false;
	selected = [];
	
	$(window).on('resize',initsize);
	
	$('#das').children().remove()
	if(typeof(editor) != 'undefined'){
	    lib.lib.show('#das')
	}

	var center = $('<center>');
	$('#das').append(center);
	$('#das').on('mousemove',mousemove);
	$('#das').on('touchmove',mousemove);
	
	// 問題領域
	var qdiv = $('<div>');
	qdiv.attr('height',100);
	qdiv.css('display','flex');
	qdiv.css('justify-content','center');
	qdiv.css('align-items','center');
	qdiv.attr('id','question');
	center.append(qdiv);

	center.append($('<p>'));

	// 回答領域
	answers = qas[0].answers; // 回答の数は同じということを仮定

	for(var i=0;i<answers.length;i++){
            var div = $('<div>');
            div.css('float','left');
            div.attr('id','id'+i);
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
	showQA();
    }

    init();

    // ファイル名を サービス名_アカウント と解釈
    // e.g. Amazon_masui@pitecan.com
    m = location.href.match(/\/(\w+_[\w\.@]+)\.html$/)
    if(m){
	data['name'] = m[1]
	$('body').attr('episodata',JSON.stringify(data));
	console.log($('body').attr('episodata'))
    }
};

exports.episodas = episodas;

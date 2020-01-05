function setup(){
    createCanvas(200,100)
    fill('#ffffff')
    rect(0,0,300,300);
}
id = 0
function draw(){
    noStroke();
    for(var x=0;x<200;x++){
	for(var y=0;y<100;y++){
	    color = round(random(0,255));
	    fill(color,color,color)
	    rect(x,y,1,1)
	}
    }
    if(id < 10){
	n = ("000" + id).slice(-2)
	save("noise" + n + ".png")
	id += 1
    }
}


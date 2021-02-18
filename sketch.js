var gameState="wait"
var life=3;

function preload(){
boyanimation=loadAnimation("boyrun1.png","boyrun2.png","boy21.png")
}

function setup(){
	createCanvas(displayWidth-50,displayHeight-30);

	road=createSprite(displayWidth/2,displayHeight/2,500,500);

boy=createSprite(displayWidth/2,displayHeight-250,100,50);
boy.addAnimation("run",boyanimation)

obstaclegroup=new Group();
}

function draw(){

	if(gameState=="wait"){
		background("lightblue")
		text ("instructions",displayWidth-1000,100);
		if(keyDown("enter")){
			gameState="play"
		}
	}

	if(gameState=="play"){
	background("yellow");

	if(keyIsDown(UP_ARROW)){
	//	boy.velocityY=-10
	road.velocityY=+10
	}

	if(keyDown(LEFT_ARROW)){
		boy.x=boy.x-5
	}

	if(keyDown(RIGHT_ARROW)){
		boy.x=boy.x+5
	}


	if(road.y>displayHeight){
		road.y=displayHeight/2;
	}

	spawnobstacles()

	if(obstaclegroup.isTouching(boy)){
		life=life-1;
		if(life==0){
			gameState="over";
		}
		
	}
	drawSprites()
}

if(gameState=="over"){
	background("lightgreen");
	textSize(40);
	stroke ("red");
	strokeWeight(20);
	
	text ("game Over",displayWidth/2-200,displayHeight/2)
}
}

function spawnobstacles(){
	if(frameCount % Math.round(random(100,150)) ==0){
		var obstacle=createSprite(random(displayWidth-1500,displayWidth-500),0,50,50);
		obstacle.velocityY=5;

		obstaclegroup.add(obstacle)
	}
}



var gameState="wait"
var life=3;
var coins=0;

function preload(){
boyanimation=loadAnimation("boy1.png","boy2.png","boy21.png");
ob2img=loadImage("ob 2.png")
coinimg=loadImage("coin.png")
}

function setup(){
	createCanvas(displayWidth-50,displayHeight-30);

	road=createSprite(displayWidth/2,displayHeight/2,500,500);

boy=createSprite(displayWidth/2,displayHeight-250,100,50);
boy.addAnimation("run",boyanimation)
//boy.debug=true;
boy.setCollider("rectangle",0,0,80,250);

obstaclegroup=new Group();
coingroup = new Group();

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

	boy.x=mouseX;


	if(road.y>displayHeight){
		road.y=displayHeight/2;
	}

	spawnobstacles()
	spawncoins();

	if(obstaclegroup.collide(boy)){
		life-=1;
		obstaclegroup.destroyEach();
		if(life == 0){
			gameState="over";
	
		}
	}

	
	drawSprites();

	if(coingroup.collide(boy)){
		coins+=1;
		coingroup.destroyEach();
	}

	if(coins==1){
		gameState="level2 "
		console.log(gameState)
	}
	fill("brown");
	textSize(20);
	text("COINS: "+coins,displayWidth-250,150);

	text ("LIFELINES:" + life,displayWidth/2-200,displayHeight/2)
}

if(gameState=="level2"){
	background("red");
//	drawSprites();
}

if(gameState=="over"){
	background("lightgreen");
	textSize(40);
	stroke ("red");
	strokeWeight(20);
	
	text ("game Over",displayWidth/2-200,displayHeight/2);
	
}
}

function spawnobstacles(){
	if(frameCount % 350 ==0){
		var obstacle=createSprite(random(displayWidth-1200,displayWidth-200),0,50,50);
		obstacle.velocityY=5+frameCount/30;
		obstacle.shapeColor="red";
obstacle.addImage(ob2img)
obstacle.scale=0.5;
		obstaclegroup.add(obstacle)
	}
}


function spawncoins(){
	if(frameCount % 150 ==0){
		var coin=createSprite(random(displayWidth-1200,displayWidth-200),0,50,50);
		coin.velocityY=8+frameCount/30;
		coin.shapeColor="green";
		coin.addImage(coinimg)
		coin.scale=0.5;

		coingroup.add(coin)
	}
}


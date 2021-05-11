var dog,happyDog,database,foodS,foodStock;
var lastFed, fedTime, foodObj, feedButton, addFoodButton

function preload()
{
	dogImg=loadImage("images/dogImg.png");
  happydogImg=loadImage("images/dogImg1.png");
}

function setup() {
createCanvas(displayWidth,displayHeight);

  database=firebase.database();
  
dog=createSprite(250,250,150,150);
dog.addImage("dog",dogImg);
dog.scale=0.2

foodObj=new Food();

foodStock=database.ref('Food');
foodStock.on("value",readStock);

feed=createButton("Feed the dog!");
feed.position(700,90);
feed.mousePressed(feedDog);

addFood=createButton("Add food.");
addFood.position(800,90);
addFood.mousePressed(addFood);
  
}


function draw() {  

background(46,139,87);

foodObj.display();

fedTime=database.ref('FeedTime');
fedTime.on("value", function(data){
lastFed=data.val();
});

fill(255,255,254);
textSize(15);
if(lastFed>=12){
text("Last Feed : "+ lastFed%12 + " PM", 350,30);
}else if(lastFed==0) {
text("Last Feed : 12 AM",350, 30);
}else{
text("Last Feed : "+ lastFed + " AM", 350, 30);
}


  drawSprites();
}


function writeStock(x){
  if(x<=0){
  x=0;
  }else{
  x=x-1;
  }

  database.ref('/').update({
  Food:x
  })
}

function readStock(data) {
  foodS=data.val();
  }


function feedDog(){
dog.addImage (happyDog);

if (foodObj.getFoodStock()<=0){

  foodObj.updateFoodstock(foodobj.getFoodstock()*0);

}
else {

  foodObj.updateFoodstock(foodobj.getFoodstock()-1);

}

database.ref('/').update({

Food: foodobj.getFoodStock(),

FeedTime:hour()

})

}

function addFoods(){
foodS++;
database.ref('/').update({
Food: foodS
})}
var dog,sadDog,happyDog, database;
var foodS,foodStock;
var addFood;
var foodObj;
var feed, lastFed;
var feed_Dog;

//create feed and lastFed variable here


function preload(){
sadDog=loadImage("Dog.png");
happyDog=loadImage("happy_dog.png");
}

function setup() {
  database=firebase.database();
  createCanvas(1000,400);

  foodObj = new Food();

  foodStock=database.ref('Food');
  foodStock.on("value",readStock);
  
  dog=createSprite(800,200,150,150);
  dog.addImage(sadDog);
  dog.scale=0.15;

  //create feed the dog button here

  addFood=createButton("Add Food");
  addFood.position(800,95);
  addFood.mousePressed(addFoods);

  feed_Dog=createButton("Feed Dog");
  feed_Dog.position(900,95);
  feed_Dog.mousePressed(feedDog);

  

}

function draw() {
  background(46,139,87);
  foodObj.display();

  //write code to read fedtime value from the database 

  var food_time=database.ref('FeedTime');
  food_time.on("value",function(data){
    lastFed=data.val()
  })
  
 fill("white");
  //write code to display text lastFed time here
  if(lastFed>=12){
text("Last Fed "+ lastFed%12+" PM",350,30);
  }else if(lastFed==0){
    text("Last Fed:12 AM", 350,30);
  }
  else{
    text("Last Fed "+ lastFed+" AM",350,30);  
  }


 
  drawSprites();
}

//function to read food Stock
function readStock(data){
  foodS=data.val();
  foodObj.updateFoodStock(foodS);
}


function feedDog(){
  dog.addImage(happyDog);
  foodS--;
 foodObj.updateFoodStock(foodS);
 database.ref('/').update({
   Food:foodObj.getFoodStock(),
   FeedTime:hour()
 })
  

  //write code here to update food stock and last fed time


}

//function to add food in stock
function addFoods(){
  foodS++;
  database.ref('/').update({
    Food:foodS
  })
}

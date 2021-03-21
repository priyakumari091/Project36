var dog,sadDog,happyDog;
var feed,addFood,foodObj,foodStock,fedTime,lastFed,foodS;
var database


function preload(){
  sadDog=loadImage("Images/Dog.png");
  happyDog=loadImage("Images/happy dog.png");
}

function setup() {

  database = firebase.database();
  console.log(database);
   
  createCanvas(1000,400);


  foodObj = new Food();


  foodStock = database.ref('Food');
  foodStock.on("value", readStock)
  
  dog=createSprite(800,200,150,150);
  dog.addImage(sadDog);
  dog.scale=0.15;

  feed = createButton("Feed the dog");
  feed.position(500,100);
  feed.mousePressed(feedDog);

  addFood = createButton("Add Milk Bottles");
  addFood.position(700,100);
  addFood.mousePressed(addFoods);

 

}

function draw() {
  background(46,139,87);

  fedTime = database.ref('FeedTime');
  fedTime.on("value",function(data){
    lastFed = data.val();
  });

  fill(255,255,254);
  textSize(15);
  if(lastFed>=12){
    text("Last Feed : "+ lastFed%12 + " PM", 850,30);
   }else if(lastFed==0){
     text("Last Feed : 12 AM",350,30);
   }else{
     text("Last Feed : "+ lastFed + " AM", 850,30);
   }
 foodObj.display();
  drawSprites();
}

//function to read food Stock


//function to update food stock and last fed time


//function to add food in stock


function feedDog(){
  dog.addImage(happyDog);
  var food_stock_val = foodObj.getFoodStock();
  if(food_stock_val <= 0){
      foodObj.updateFoodStock(food_stock_val *0)
  }
  else {

      foodObj.updateFoodStock(food_stock_val-1)
  }

  database.ref('/').update({
    Food:foodObj.getFoodStock(),
    FeedTime:hour()
  })
}


function addFoods(){
  foodS++;
  database.ref('/').update({Food : foodS});
}


function readStock(data){
  foodS = data.val();
  foodObj.updateFoodStock(foodS);
}
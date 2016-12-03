const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();

app.use(cors());  
app.use(bodyParser.json());
app.listen(3000, function(){
  console.log("listening on port 3000");
});

const drinks = [{
  name:"Kamikazie",
  ingredients:["Vodka", "Triple-Sec", "Lime Juice"]
}, {
  name:"Washington-Apple",
  ingredients:["Crown Royal", "Apple-pucker", "Cranberry Juice"]
}, {
  name:"Oatmeal-Cookie",
  ingredients:["Bailey's", "Butterscotch Schnapps", "Goldschlager"]
}, {
  name:"Pineapple-Upside-down",
  ingredients:["Vanilla Vodka","Pineapple Juice", "Grenadine"]
}, {
  name:"Green-Tea",
  ingredients:["Jameson", "Peach Schnapps", "Sours"]
}, {
  name:"Scooby-Snack",
  ingredients:["Malibu", "Melon Schnapps", "Pineapple", "Cream"]
}];


app.get('/drinks', function(req, res){
  res.send(drinks);
});

app.get('/drinks/:name', function(req, res){
  var searchName = req.params.name;
  drinks.forEach(function(drink){
    if (drink.name == searchName){
      res.json(drink);
    }
  });
});

app.post('/drinks', function(req, res){
  let newDrink = {
    "name": req.body.name,
    "ingredients": req.body.ingredients
  };

  drinks.push(newDrink);
  res.json({drinks});
});

app.put('/drinks/:name', function(req, res){
  let drinkName = req.params.name;
  drinks.forEach(function(drink){
    if (drink.name == drinkName){
      drink.name = req.body.name;
      drink.ingredients = req.body.ingredients;
      res.send('Updated drink');
    }
  });
});

app.delete('/drinks/:name', function(req, res){
  let drinkName = req.params.name;
  drinks.forEach(function(drink){
    if (drink.name == drinkName){
      drinks.splice(drinks.indexOf(drink),1);
      res.send('removed drink');
    }
  });
});

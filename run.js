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
  ingredients:["Vodka", "Triple-Sec", "Lime-Juice"]
}, {
  name:"Washington-Apple",
  ingredients:["Crown-Royal", "Apple-pucker", "Cranberry-Juice"]
}, {
  name:"Oatmeal-Cookie",
  ingredients:["Bailey's", "Butterscotch-Schnapps", "Goldschlager"]
}, {
  name:"Pineapple-Upside-Down",
  ingredients:["Vanilla-Vodka","Pineapple-Juice", "Grenadine"]
}, {
  name:"Green-Tea",
  ingredients:["Jameson", "Peach-Schnapps", "Sours"]
}, {
  name:"Scooby-Snack",
  ingredients:["Malibu", "Melon-Liquor", "Pineapple", "Cream"]
}, {
  name:"Red-Headed-Slut",
  ingredients: ["Jaeger","Peach-Schnapps", "Cranberry-Juice"]
}, {
  name: "B-52",
  ingredients: ["Bailey's", "Kahlua", "Grand-Marnier"]
}, {
  name: "White-Gummy-Bear",
  ingredients: ["Cherry-Vodka", "Peach-Schnapps", "Pineapple-Juice", "Sprite"]
}, {
  name: "Lemon-Drop",
  ingredients: ["Citrus-Vodka", "Sugar", "Lemon"]
}, {
  name: "Butter-Ball",
  ingredients: ["Butterscotch-Schnapps", "Amaretto"]
}, {
  name: "Vegas-Bomb",
  ingredients: ["Crown-Royal", "Peach-Schnapps", "Red-Bull", "Cranberry-Juice"]
}, {
  name: "Melon-Ball",
  ingredients: ["Vodka", "Melon-Liquor", "Pineapple-Juice"]
}, {
  name: "Girl-Scout-Cookie",
  ingredients: ["Bailey's", "Kahlua", "Peppermint-Schnapps"]
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

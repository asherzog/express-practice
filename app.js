$(document).ready(function(){
  $('.click-me').click(displayAll);
  $('.search-form').submit(displayOne);
  $('.ingredient-form').submit(searchByIngredient);
});

const MY_API = 'http://localhost:3000/drinks';


function displayAll(){
  $('section').html('');
  $.get(MY_API, function(data){
    data.forEach(function(drink){
      $('section').append(`
        <h4 class="card-title center-align">${drink.name}</h4>
        <p class="center-align" style= "border-bottom: 1px solid grey;">${drink.ingredients.join(', ')}</p>
        `);
    });
  });
};


function displayOne(event){
  event.preventDefault();
  let drink = $('input').val();
  if (drink.split(' ').length > 1){
    drink = drink.split(' ');
    let newArr = [];
    drink.forEach(function(word){
      let upperWord = word.split('')[0].toUpperCase() + word.split('').splice(1).join('');
      newArr.push(upperWord);
    });
    drink = newArr.join('-');
  }else{
    drink = drink.split('')[0].toUpperCase() + drink.split('').splice(1).join('');
  }
  $('section').html('');
  $('input').val('');
  $.get(`${MY_API}/${drink}`, function(data){
    $('section').append(`
      <h4 class="center-align">${data.name}</h4>
      <p class="center-align">${data.ingredients.join(', ')}</p>
      `);
  });
}

function searchByIngredient(event){
  event.preventDefault();
  let $ingredients = $('#ingredients1').val().split(', ');
  var newArr = [];
  $.get(MY_API, function(data){
    data.forEach(function(drink){
      if (drink.ingredients.sort().join('') == $ingredients.sort().join('')){
        $('section').append(`
          <h4 class="card-title center-align">${drink.name}</h4>
          <p class="center-align" style= "border-bottom: 1px solid grey;">${drink.ingredients.join(', ')}</p>
        `);
      }
    });
  });
}

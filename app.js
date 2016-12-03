$(document).ready(function(){
  $('.click-me').click(displayAll);
  $('form').submit(displayOne);
});


function displayAll(){
  $('section').html('');
  $.get('http://localhost:3000/drinks', function(data){
    data.forEach(function(drink){
      $('section').append(`
        <h4 class="center-align">${drink.name}</h4>
        <p class="center-align">${drink.ingredients.join(', ')}</p>
        `);
    });
  });
};


function displayOne(event){
  event.preventDefault();
  let drink = $('input').val();
  $('section').html('');
  $('input').val('');
  $.get(`http://localhost:3000/drinks/${drink}`, function(data){
    $('section').append(`
      <h4 class="center-align">${data.name}</h4>
      <p class="center-align">${data.ingredients.join(', ')}</p>
      `);
  });
}

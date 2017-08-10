let $ = require('jquery');
let handlebars = require('handlebars');

// 1. select the search button
let inputValue = document.getElementById("searchButton");
// 2. add event listerner for click on button

 inputValue.addEventListener("click", function(){
   clearSearchResults();
   doSearch();
 });

function doSearch(){
  let puppyUrl = 'http://recipepuppyproxy.herokuapp.com/api/?';

  // 1. get the value from the input
  let searchInput = document.getElementById('search').value;
 //let ingredientInput = document.getElementById('ingredient').value;
  // 2. concat the input value to the puppyUrl var
 puppyUrl = (puppyUrl + 'q=' + encodeURI(searchInput));
console.log(puppyUrl);
  // 3. make ajax request
  fetch(puppyUrl).then(function(res){
      return res.json();
  }).then(showSearchResults);
  //console.log(doSearch());
}

function clearSearchResults(){
  $('.searchArea').html('');
}

function showSearchResults(ajaxResults) {
  let foodList = ajaxResults.results;
  displayFood(foodList);
}

function displayFood(foodList){
  let source = $('#puppy-template').html();
  let template = handlebars.compile(source);

  console.log(source);
  console.log(template);
  console.log(foodList);

   foodList.forEach(function(food){
     let $searchResultHtml = $(template(food));
    $('.searchArea').append($searchResultHtml);
  });


}

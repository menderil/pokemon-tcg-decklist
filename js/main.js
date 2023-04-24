//add event listener to search button
document.querySelector('button').addEventListener('click', getCards);

//variables for insertion points in the html
let searchResultList = document.querySelector('#cardResults');
let deckList = document.querySelector('#deckList');

let searchResult = [];


let emptyMessage = document.createElement('span')
emptyMessage.innerText = 'No results found'


//This function takes the user input from the search bar and makes a fetch request with it. The resulting array is saved to the searchResult variable

function getCards(){
  let searchInput = '"' + document.querySelector('input').value + '"'
  
  fetch(`https://api.pokemontcg.io/v2/cards?q=name:${searchInput}`)
    .then(response => response.json())
    .then(response => {
      //for testing
      console.log(response)

      searchResult = response.data
      console.log(searchResult)

      displaySearchResults();
    })
    .catch(err => console.log(`error : ${err}`));

}

//This function clears the previously displayed searchResults. It then creates an li with an image and array id for earch card in the new search results, then appends the li to the searchResultList ul
function displaySearchResults(){
  clearList(searchResultList);
  if(searchResult.length == 0){
    searchResultList.appendChild(emptyMessage)
  }
  for(let i = 0; i < searchResult.length; i++){
    searchResultList.appendChild(createSearchResult(searchResult[i], i))
  }
}

//This function clears all children of the passed ul
function clearList(ul){
  while(ul.firstChild ){
    ul.removeChild(ul.firstChild);
  }
}

//This function takes in a card object and its index in the search result array and returns an li made with the information
function createSearchResult(card, arrayIndex){
  let li = document.createElement('li');
  let img = document.createElement('img');

  li.id = arrayIndex;
  img.src = card.images.small;
  li.appendChild(img);

  return li;
}
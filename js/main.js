//add event listener to search button
document.querySelector('button').addEventListener('click', getCards);

//variables for insertion points in the html
let searchResultList = document.querySelector('#cardResults');
let deckList = document.querySelector('#deckList');

let searchResult = [];
let currentDeck = [];


let emptyMessage = document.createElement('span');
emptyMessage.innerText = 'No results found';


//This function takes the user input from the search bar and makes a fetch request with it. The resulting array is saved to the searchResult variable

async function getCards(){
  let searchInput = '"' + document.querySelector('input').value + '"'
  
  const res = await fetch(`https://api.pokemontcg.io/v2/cards?q=name:${searchInput}`);
  const result = await res.json();
  searchResult = result.data;
  displaySearchResults();
}

//This function clears all children of the passed ul
function clearList(ul){
  while(ul.firstChild ){
    ul.removeChild(ul.firstChild);
  }
}

//This function clears the previously displayed searchResults. It then creates an li with an image and array id for earch card in the new search results, then appends the li to the searchResultList ul
function displaySearchResults(){
  clearList(searchResultList);
  if(searchResult.length == 0){
    searchResultList.appendChild(emptyMessage);
  }
  for(let i = 0; i < searchResult.length; i++){
    searchResultList.appendChild(createSearchResult(searchResult[i], i));
  }
}

//This function takes in a card object and its index in the search result array and returns an li made with the information
function createSearchResult(card, arrayIndex){
  let li = document.createElement('li');
  let img = document.createElement('img');

  li.id = arrayIndex;
  img.src = card.images.small;
  li.appendChild(img);

  li.addEventListener('click', addToDeck);
  return li;
}

//This function takes the id from the clicked card and uses it to pull the object from the searchResult array. The info is used to add the card to the deckList
function addToDeck(){
  let card = getCardInfo(searchResult[this.id]);
  console.log(card);

}

function getCardInfo(card){
  console.log(card);
  let cardCode = '';
  let setId = card.set.id;
  //check for pctgo code
  switch (setId){
    case 'sv1':
      cardCode = 'SVI';
      break;
    case 'sv2':
      cardCode = 'PAL';
      break;
    case 'svp':
      cardCode = 'PR-SV';
      break;
    default:
      cardCode = card.set.ptcgoCode;
  }

  let createdCard = new Card(card, cardCode);
  
  return createdCard;
}

class Card {
  constructor(cardInfo, cardCode){
    this._name = `${cardInfo.name} ${cardCode} ${cardInfo.number}`;
    this._qty = 1;
    this._cardInfo = cardInfo;
  }

  get name() {
    return this._name;
  }

  get quantity() {
    return this._qty;
  }
  
  addOne(){
    this._qty += 1;
  }

  subtractOne(){
    this._qty -= 1;
  }
}
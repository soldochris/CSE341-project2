const myFavs = document.getElementById('myFavs');
const userId = document.getElementById('userId').innerText;
const apiMyFavs = 'https://boiling-dawn-58880.herokuapp.com/api/userFavs/' + userId;

fetch(apiMyFavs)
  .then((response) => response.json())
  .then((jsObject) =>{
    if(jsObject.length){
      //DISPLAY users FAVS
      console.log('you have favs');
    }else{
      console.log('you DONT have favs');
      let alert = document.createElement('div');

      alert.innerHTML = `<div class="alert alert-warning mx-auto" style="width:60%" role="alert">
      You still don't have favorite characters, please add some from the list below.</div>`;
      myFavs.appendChild(alert);
    }
  })
  .catch(function(err) {
    console.log('Fetch Error :', err);
  });

console.log(apiMyFavs);
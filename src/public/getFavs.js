const myFavs = document.getElementById('myFavs');
const userId = document.getElementById('userId').innerText;
const apiMyFavs = 'https://boiling-dawn-58880.herokuapp.com/api/userFavs/' + userId;

fetch(apiMyFavs)
  .then((response) => response.json())
  .then((jsObject) =>{
    if(jsObject.length){
      //DISPLAY users FAVS
      let myList = document.createElement('ul');

      for (let i = 0; i < jsObject.length ;i++){
        let fav_id = jsObject[i].fav_id;
        let apiCharUrl = 'https://rickandmortyapi.com/api/character/';
        
        fetch(apiCharUrl + jsObject[i].char_id)
        .then((response) => response.json())
        .then((jsObject) =>{
          let newLi = document.createElement('li');
          let favModal = document.createElement('div');
          //console.log(JSON.stringify(jsObject));

          newLi.innerHTML = `<a href="#" class="list-group-item list-group-item-action" data-bs-toggle="modal" data-bs-target="#favModal${jsObject.id}">${jsObject.name}</a>`;
          favModal.innerHTML =
          `
          <div class="modal fade" id="favModal${jsObject.id}" data-backdrop="static" data-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
            <div class="modal-dialog">
              <div class="modal-content">
                <div class="modal-header">
                  <img src="${jsObject.image}" alt="${jsObject.name}"  class="m-1">
                  <h5 class="modal-title" >${jsObject.name}</h5>
                </div>
                <div class="modal-body">
                  <ul "list-group">
                    <li class="list-group-item d-flex justify-content-between align-items-center list-group-item-info">
                      Status:
                      <span>${jsObject.status}</span>
                    </li>
                    <li class="list-group-item d-flex justify-content-between align-items-center list-group-item-info">
                      Specie:
                      <span>${jsObject.species}</span>
                    </li>
                    <li class="list-group-item d-flex justify-content-between align-items-center list-group-item-info">
                      Type:
                      <span>${jsObject.type}</span>
                    </li>
                    <li class="list-group-item d-flex justify-content-between align-items-center list-group-item-info">
                      Gender:
                      <span>${jsObject.gender}</span>
                    </li>
                  </ul>
                </div>
                <div class="modal-footer">
                  <a class="btn btn-danger" href="/delFav/${fav_id}" >Remove from Favs</a>
                  <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                </div>
              </div>
            </div>
          </div>
          `;
          newLi.appendChild(favModal);
          myList.appendChild(newLi);
        })
        .catch(function(err) {
          console.log('Fetch Error :', err);
        });

      }
      myList.classList.add("list-group");
      myList.classList.add("mx-auto");
      myList.style.width = "60%";
      myFavs.appendChild(myList);
      
    }else{
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
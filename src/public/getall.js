const apiUrl = 'https://rickandmortyapi.com/api/character/?page=';
const idUser = document.getElementById('userId').innerText;

const characterList = document.getElementById('allChars');

for(let i= 0; i <= 34 ;i++){

  fetch(apiUrl + i)
  .then((response) => response.json())
  .then((jsObject) =>{

    for (let j = 0; j < jsObject.results.length ; j++){
      //console.log(jsObject.results[j].id);

      let newLi = document.createElement('li');
      let modal = document.createElement('div');

      newLi.innerHTML = `<a href="#" class="list-group-item list-group-item-action" data-bs-toggle="modal" data-bs-target="#modal${jsObject.results[j].id}">${jsObject.results[j].name}</a>`;

      modal.innerHTML =
      `
      <div class="modal fade" id="modal${jsObject.results[j].id}" data-backdrop="static" data-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <img src="${jsObject.results[j].image}" alt="${jsObject.results[j].name}"  class="m-1">
              <h5 class="modal-title" >${jsObject.results[j].name}</h5>
            </div>
            <div class="modal-body">
              <ul "list-group">
                <li class="list-group-item d-flex justify-content-between align-items-center list-group-item-info">
                  Status:
                  <span>${jsObject.results[j].status}</span>
                </li>
                <li class="list-group-item d-flex justify-content-between align-items-center list-group-item-info">
                  Specie:
                  <span>${jsObject.results[j].species}</span>
                </li>
                <li class="list-group-item d-flex justify-content-between align-items-center list-group-item-info">
                  Type:
                  <span>${jsObject.results[j].type}</span>
                </li>
                <li class="list-group-item d-flex justify-content-between align-items-center list-group-item-info">
                  Gender:
                  <span>${jsObject.results[j].gender}</span>
                </li>
              </ul>
            </div>
            <div class="modal-footer">
              <a class="btn btn-success" href="/addFav/${jsObject.results[j].id}&${idUser}" >Add to Favs</a>
              <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            </div>
          </div>
        </div>
      </div>
      `;
      
      newLi.appendChild(modal);
      characterList.appendChild(newLi);

    }
    
  })
  .catch(function(err) {
    console.log('Fetch Error :', err);
  });

}
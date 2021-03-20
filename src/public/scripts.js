const apiUrl = 'https://rickandmortyapi.com/api/character';
const characterList = document.getElementById('list-characters');

  fetch(apiUrl)
  .then((response) => response.json())
  .then((jsObject) =>{
    console.log(jsObject.results);
    for(let i = 0; i < jsObject.results.length ;i++){
      let newLi = document.createElement('li');
      let modal = document.createElement('div');

      newLi.innerHTML = `<a href="#" class="list-group-item list-group-item-action" data-bs-toggle="modal" data-bs-target="#modal${jsObject.results[i].id}">${jsObject.results[i].name}</a>`;

      modal.innerHTML =
      `
      <div class="modal fade" id="modal${jsObject.results[i].id}" data-backdrop="static" data-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <img src="${jsObject.results[i].image}" alt="${jsObject.results[i].name}"  class="m-1">
              <h5 class="modal-title" >${jsObject.results[i].name}</h5>
            </div>
            <div class="modal-body">
              <ul "list-group">
                <li class="list-group-item d-flex justify-content-between align-items-center list-group-item-info">
                  Status:
                  <span>${jsObject.results[i].status}</span>
                </li>
                <li class="list-group-item d-flex justify-content-between align-items-center list-group-item-info">
                  Specie:
                  <span>${jsObject.results[i].species}</span>
                </li>
                <li class="list-group-item d-flex justify-content-between align-items-center list-group-item-info">
                  Type:
                  <span>${jsObject.results[i].type}</span>
                </li>
                <li class="list-group-item d-flex justify-content-between align-items-center list-group-item-info">
                  Gender:
                  <span>${jsObject.results[i].gender}</span>
                </li>
              </ul>
            </div>
            <div class="modal-footer">
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
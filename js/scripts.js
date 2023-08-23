let pokemonRepository = (function () {
  let pokemonList = [];
  let apiUrl = "https://pokeapi.co/api/v2/pokemon/?limit=150";
  
  function getAll() {
    return pokemonList;
  }
  function add(item) {
    if (
      typeof item === "object" && 'name' in item && 'detailsUrl' in item
    ) {
      pokemonList.push(item);
    } else {
      console.log("Please check the inputs");
    }
  }
  function addListItem(pokemon) {
    let unorderedList = document.querySelector(".pokemon-list");
    let listItem = document.createElement("li");
    let button = document.createElement("button");
    listItem.classList.add('list-group-item', 'col-md-4');
    button.innerText = pokemon.name;
    button.classList.add("my-btn", 'btn-primary');
    button.setAttribute("data-bs-toggle", "modal");
    button.setAttribute("data-bs-target", "#modal-container");
    button.setAttribute("type", "button");
    listItem.appendChild(button);
    unorderedList.appendChild(listItem);

    button.addEventListener("click", () => showDetails(pokemon))
  }

  function showDetails(pokemon) {
    loadDetails(pokemon).then(function() {
      showModal(pokemon);
    });
  }

  function find(name) {
    return pokemonList.find((pokemon) => pokemon.name === name);
  }
  function loadList() {
    return fetch(apiUrl)
      .then(function (response) {
        return response.json();
      })
      .then(function (json) {
        json.results.forEach(function (item) {
          let pokemon = {
            name: item.name,
            detailsUrl: item.url,
          };
          add(pokemon);
        });
      })
      .catch(function (e) {
        console.error(e);
      });
  }
  function loadDetails(item) {
    let url = item.detailsUrl;
    return fetch(url)
      .then(function (response) {
        return response.json();
      })
      .then(function (details) {
        item.imageUrl = details.sprites.other["official-artwork"].front_default;
        item.height = details.height;
        item.types = [];
        for (var i = 0; i < details.types.length; i++) {
          item.types.push(details.types[i].type.name);
        }
        showModal(item)
      })
      .catch(function (e) {
        console.error(e);
      });
  }

  function showModal(pokemon) { 
    let pokemonNameElement = document.querySelector('.modal-title');
    pokemonNameElement.innerText = pokemon.name;
  
    let pokemonHeightElement = document.querySelector('.modal-height');
    pokemonHeightElement.innerText = `Height: ${pokemon.height}`;

    let pokemonImageElement = document.querySelector('.modal-img');
    pokemonImageElement.src = pokemon.imageUrl;
    
    let pokemonTypesElement = document.querySelector('.modal-types');
    pokemonTypesElement.innerText = `Types: ${pokemon.types}`
    
  
    // let modalContainer = document.querySelector('#modal-container');
    //  modalContainer.innerHTML = '';
  
  //   let modal = document.createElement('div');
  //   modal.classList.add('modal');
  
  //   let closeButtonElement = document.createElement('button');
  //   closeButtonElement.classList.add('modal-close');
  //   closeButtonElement.innerText = 'Close';
  //   closeButtonElement.addEventListener('click', hideModal);
  
  //   let titleElement = document.createElement('h1');
  //   titleElement.innerText = pokemon.name;
  
  //   let contentElement = document.createElement('p');
  //   contentElement.innerText = 'Height: ' + pokemon.height;
  
  //   let imageElement = document.createElement('img');
  //   imageElement.src = pokemon.imageUrl;
  
  //   modal.appendChild(closeButtonElement);
  //   modal.appendChild(titleElement);
  //   modal.appendChild(contentElement);
  //   modal.appendChild(imageElement);
    // modalContainer.appendChild(modal);
  
  
  //  modalContainer.classList.add('is-visible');
  }
  

  return {
    getAll: getAll,
    add: add,
    addListItem: addListItem,
    find: find,
    loadList: loadList,
    loadDetails: loadDetails,
    showDetails: showDetails
  }
})();

//   pokemonRepository.add({name: 'Pidgey', height: 0.3, types: ["normal", "flying"]})

//   pokemonRepository.getAll().forEach(function (pokemon) {
//       pokemonRepository.addListItem(pokemon);
//   });

//  console.log(pokemonRepository.find('Zekrom'))

pokemonRepository.loadList().then(function () {
  pokemonRepository.getAll().forEach(function (pokemon) {
    pokemonRepository.addListItem(pokemon);
  });
});






let dialogPromiseReject;

function hideModal() {
  let modalContainer = document.querySelector('#modal-container');
  modalContainer.classList.remove('is-visible');
    if (dialogPromiseReject) {
    dialogPromiseReject();
    dialogPromiseReject = null;
  }
}
window.addEventListener('keydown', (e) => {
  let modalContainer = $('#modal-container');
  if (e.key === 'Escape' && modalContainer.classList.contains('is-visible')) {
    hideModal();  
  }
})

let modalContainer = $('#modal-container');
modalContainer.addEventListener('click', (e) => {
  let target = e.target;
  if (target === modalContainer) {
    hideModal();
  }
});


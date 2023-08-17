let pokemonRepository = (function () {
  let pokemonList = [];
  let apiUrl = "https://pokeapi.co/api/v2/pokemon/?limit=150";
  let modalContainer = document.querySelector('#modal-container');
  let dialogPromiseReject;

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
    button.innerText = pokemon.name;
    button.classList.add("button");
    listItem.appendChild(button);
    unorderedList.appendChild(listItem);
    button.addEventListener("click", () => showDetails(pokemon))
  }

  function showDetails(pokemon) {
    loadDetails(pokemon)
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
        item.imageUrl = details.sprites.front_default;
        item.height = details.height;
        item.types = details.types;
        showModal(item)
      })
      .catch(function (e) {
        console.error(e);
      });
  }

  function showModal(pokemon) {
    modalContainer.innerHTML = '';
  
    let modal = document.createElement('div');
    modal.classList.add('modal');
  
    let closeButtonElement = document.createElement('button');
    closeButtonElement.classList.add('modal-close');
    closeButtonElement.innerText = 'Close';
    closeButtonElement.addEventListener('click', hideModal);
  
    let titleElement = document.createElement('h1');
    titleElement.innerText = pokemon.name;
  
    let contentElement = document.createElement('p');
    contentElement.innerText = 'Height: ' + pokemon.height;
  
    let imageElement = document.createElement('img');
    imageElement.src = imageElement.imageUrl;
  
    modal.appendChild(closeButtonElement);
    modal.appendChild(titleElement);
    modal.appendChild(contentElement);
    modal.appendChild(imageElement);
    modalContainer.appendChild(modal);
  
  
   modalContainer.classList.add('is-visible');
  }
  
  function hideModal() {
    modalContainer.classList.remove('is-visible');
      if (dialogPromiseReject) {
      dialogPromiseReject();
      dialogPromiseReject = null;
    }
  }
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modalContainer.classList.contains('is-visible')) {
      hideModal();  
    }
  })
  modalContainer.addEventListener('click', (e) => {
    let target = e.target;
    if (target === modalContainer) {
      hideModal();
    }
  });
  

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



let pokemonRepository = (function () {
  let pokemonList = [
    { name: "Mantine", height: 2.1, types: ["water", "flying"] },
    { name: "Nidoking", height: 1.4, types: ["ground", "poison"] },
    { name: "Zekrom", height: 2.9, types: ["dragon", "electric"] },
  ];

  function showDetails(pokemon){
    console.log(pokemon);
  };
  
  return {
    getAll: function () {
      return pokemonList;
    },
    add: function (item) {
      if (typeof item === "object" && 'name' in item && 'height' in item && 'types' in item) {
        pokemonList.push(item);
      } else {
        console.log("Please check the inputs");
      }
    },
    addListItem: function addListItem(pokemon) {
      let unorderedList = document.querySelector(".pokemon-list");
      let listItem = document.createElement("li");
      let button = document.createElement("button");
      button.innerText = pokemon.name
      button.classList.add("button");
      listItem.appendChild(button);
      unorderedList.appendChild(listItem);
      button.addEventListener('click', () => showDetails(pokemon));
    },
  };

})();

pokemonRepository.add({name: 'Pidgey', height: 0.3, types: ["normal", "flying"]})

pokemonRepository.getAll().forEach(function (pokemon) {
    pokemonRepository.addListItem(pokemon);
});




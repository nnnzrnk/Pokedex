let pokemonRepository = (function(){
    let pokemonList = [
        { name: "Mantine", height: 2.1, types: ["water", "flying"] },
        { name: "Nidoking", height: 1.4, types: ["ground", "poison"] },
        { name: "Zekrom", height: 2.9, types: ["dragon", "electric"] },
      ];

      return {
        getAll: function(){
            return pokemonList;
        },
        add: function(item){
            return pokemonList.push(item);
        }
      };
})();

pokemonRepository.add({name: 'Pidgey', height: 0.3, types: ["normal", "flying"]})

//completed Task 1.5 
//First way:

// pokemonList.forEach(function(pokemons){
//     console.log(`${pokemons.name} has height ${pokemons.height} and its types are ${pokemons.types} `)
// });

//Second way:

function getPokemonsInfo(pokemons){
    console.log(`${pokemons.name} has height ${pokemons.height} and its types are ${pokemons.types} `)
}
pokemonRepository.getAll().forEach(getPokemonsInfo)


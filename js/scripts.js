
let pokemonList = [
  { name: "Mantine", height: 2.1, types: ["water", "flying"] },
  { name: "Nidoking", height: 1.4, types: ["ground", "poison"] },
  { name: "Zekrom", height: 2.9, types: ["dragon", "electric"] },
]

//Task 1.3

// for (let i = 0; i < pokemonList.length; i++) {
//     document.write(`${pokemonList[i].name} (height: ${pokemonList[i].height}) `)
    
//     if (pokemonList[i].height > 2.5) {
//         document.write(` ${pokemonList[i].name} (height: ${pokemonList[i].height}) - Wow, that’s big!`)
//     } else {
//         document.write(` ${pokemonList[i].name} (height: ${pokemonList[i].height}) `)
//     }
// }



//completed Task 1.5 
//First way:

pokemonList.forEach(function(pokemons){
    console.log(`${pokemons.name} has height ${pokemons.height} and its types are ${pokemons.types} `)
});

//Second way:

function getPokemonsInfo(pokemons){
    console.log(`${pokemons.name} has height ${pokemons.height} and its types are ${pokemons.types} `)
}
pokemonList.forEach(getPokemonsInfo)


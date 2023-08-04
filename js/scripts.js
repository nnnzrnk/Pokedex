let pokemonList = [
  { name: "Mantine", height: 2.1, types: ["water", "flying"] },
  { name: "Nidoking", height: 1.4, types: ["ground", "poison"] },
  { name: "Zekrom", height: 2.9, types: ["dragon", "electric"] },
]

for (let i = 0; i < pokemonList.length; i++) {
    document.write(`${pokemonList[i].name} (height: ${pokemonList[i].height}) `)
    
    if (pokemonList[i].height > 2.5) {
        document.write(` ${pokemonList[i].name} (height: ${pokemonList[i].height}) - Wow, that’s big!`)
    } else {
        document.write(` ${pokemonList[i].name} (height: ${pokemonList[i].height}) `)
    }
}



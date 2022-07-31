const pokemonName = document.querySelector('.pokemon_name')
const pokemonNumber = document.querySelector('.pokemon_id')
const pokemonImage = document.querySelector('.pokemon_image')
const pokemonType = document.querySelector('.input_type')
const form = document.querySelector('.form')
const inputSearch = document.querySelector('.input_search')
const buttonPrevious = document.querySelector('.button_prev')
const buttonNext = document.querySelector('.button_next')

let pokemon_id = 1

const fetchPokemon = async (pokemon) => {
    const APIResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`)
    
    if (APIResponse.status === 200) {
        const data = await APIResponse.json()
        return data
    }
}

const renderPokemon = async (pokemon) => {

    pokemonName.innerHTML = 'Loading...'
    pokemonNumber.innerHTML = ''
    pokemonType.value = 'Pokémon type'

    const data = await fetchPokemon(pokemon)

    if (data) {
        pokemonImage.style.display = 'block'
        pokemonName.innerHTML = data.name
        pokemonNumber.innerHTML = data.id
        pokemonImage.src = data['sprites']['versions']['generation-v']['black-white']['animated']['front_default']
        pokemon_id = data.id

        if (data['types']['1']) {
            pokemonType.value = `Pokémon type: ${data['types']['0']['type']['name']} - ${data['types']['1']['type']['name']}`
        } else {
            pokemonType.value = `Pokémon type: ${data['types']['0']['type']['name']}`
        }
        
    } else {
        pokemonImage.style.display = 'none'
        pokemonName.innerHTML = 'Not found :('
        pokemonNumber.innerHTML = ''
        pokemonImage.src = "#"
        pokemonType.value = 'Pokémon type'
    }
}

inputSearch.addEventListener('keyup', (event) => {
    event.preventDefault()
    if (event.key === "Enter") {
        renderPokemon(inputSearch.value.toLowerCase())
        inputSearch.value = ''
    }

})

buttonNext.addEventListener('click', () => {
    renderPokemon(pokemon_id += 1)
})

buttonPrevious.addEventListener('click', () => {
    if (pokemon_id > 0) {
        renderPokemon(pokemon_id -= 1)
    }
    
})

renderPokemon(pokemon_id)
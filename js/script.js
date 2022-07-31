const pokemonName = document.querySelector('.pokemon_name')
const pokemonNumber = document.querySelector('.pokemon_id')
const pokemonImage = document.querySelector('.pokemon_image')
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

    const data = await fetchPokemon(pokemon)

    if (data) {
        pokemonImage.style.display = 'block'
        pokemonName.innerHTML = data.name
        pokemonNumber.innerHTML = data.id
        pokemonImage.src = data['sprites']['versions']['generation-v']['black-white']['animated']['front_default']
        pokemon_id = data.id
    } else {
        pokemonImage.style.display = 'none'
        pokemonName.innerHTML = 'Not found :('
        pokemonNumber.innerHTML = ''
        pokemonImage.src = "#"
    }
}

form.addEventListener('submit', (event) => {
    event.preventDefault()
    renderPokemon(inputSearch.value.toLowerCase())
    inputSearch.value = ''
})

buttonNext.addEventListener('click', () => {
    renderPokemon(pokemon_id += 1)
    console.log(pokemon_id)
})

buttonPrevious.addEventListener('click', () => {
    if (pokemon_id > 0) {
        renderPokemon(pokemon_id -= 1)
        console.log(pokemon_id)
    }
    
})

renderPokemon(pokemon_id)
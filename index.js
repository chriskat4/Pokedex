const pokemonName = document.querySelector(".pokemonName");
const pokemonNumber = document.querySelector(".pokemonNumber");
const pokemonImage = document.querySelector(".pokemon_image");

const form = document.querySelector('form')
const input = document.querySelector('form input');



const fetchPokemon = async (pokemon) =>{
    pokemonName.innerHTML = 'Loading...';
    pokemonNumber.innerHTML = '~';
    
    const APIResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);
    
    if(APIResponse.status == 200){
        const data = await APIResponse.json();
        return data;
    }
    if(APIResponse.status != 200){
        pokemonName.innerHTML = 'InvalidPokemon.';
        pokemonNumber.innerHTML = '~';
        pokemonImage.src = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/251.gif';
        input.value = '';
    }
}

const renderPokemon = async (pokemon) => {
    const data = await fetchPokemon(pokemon);
    pokemonName.innerHTML = data.name;
    pokemonNumber.innerHTML = data.id;
    pokemonImage.src = data['sprites']['versions']['generation-v']['black-white']['animated']['front_default'];
    input.value= '';
}


form.addEventListener('submit',(e) => {
    e.preventDefault();
    
    renderPokemon(input.value.toLowerCase());
});

renderPokemon('25');

const pokemonList = document.getElementById('pokemonList');
const loadMoreButton = document.getElementById('load_more');
const clickedType = document.getElementsByClassName('type ');
const maxRecords = 100;
const limit = 5;
let offset = 0;

function convertPokemonToLi(pokemon) {
    return `
        <li class="pokemon ${pokemon.type}">
            <span class="number">#${pokemon.number}</span>
            <span class="name">${pokemon.name}</span>

            <div class="detail">
                <ol class="types">
                    ${pokemon.types.map((type) => `<li class="type ${type}"><a href=# onclick="loadTypedPokemons(${offset}, ${limit}, '${type}')">${type}</a></li>`).join('')}
                </ol>

                <img src="${pokemon.photo}" alt="${pokemon.name}">
            </div>
        </li>    
    `;
}


let loadTypedPokemons = (offset, limit, type) => {
    pokeApi.getPokemons(offset, 151).then((pokemons = []) => {
        pokemonList.innerHTML = pokemons.filter((pokemon) => pokemon.types.includes(type)).map(convertPokemonToLi).join('');
        loadMoreButton.parentElement.removeChild(loadMoreButton);
    });
};

function loadPokemons(offset, limit) {
    pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
        pokemonList.innerHTML += pokemons.map(convertPokemonToLi).join('');
    });
}

loadPokemons(offset, limit);

loadMoreButton.addEventListener('click', () => {
    offset += limit;

    const qtdRecordNextPage = offset + limit;

    if (qtdRecordNextPage >= maxRecords) {
        const newLimit = maxRecords - offset;
        loadPokemons(offset, newLimit);

        loadMoreButton.parentElement.removeChild(loadMoreButton);
    } else {
        loadPokemons(offset, limit);
    }

});

console.log(clickedType);
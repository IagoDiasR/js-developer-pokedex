const pokemonList = document.getElementById('pokemonList');
const loadMoreButton = document.getElementById('loadMoreButton');

const maxRecords = 151; // Total de Pokémon disponíveis
const limit = 10; // Quantidade de Pokémon por vez
let offset = 0; // Offset inicial

// Função para converter um Pokémon em um elemento <li>
function convertPokemonToLi(pokemon) {
    return `
        <li class="pokemon ${pokemon.type}" onclick="toggleDetails(event)">
            <span class="number">#${pokemon.number.toString().padStart(3, '0')}</span>
            <span class="name">${pokemon.name}</span>

            <div class="detail">
                <ol class="types">
                    ${pokemon.types.map(type => `<li class="type ${type}">${type}</li>`).join('')}
                </ol>
                <img src="${pokemon.photo}" alt="${pokemon.name}">
            </div>

            <div class="extra-details">
                <p>Height: ${pokemon.height}</p>
                <p>Weight: ${pokemon.weight}</p>
                <p>Abilities: ${pokemon.abilities.join(', ')}</p>
            </div>
        </li>
    `;
}

// Função para carregar Pokémon
async function loadPokemonItens(offset, limit) {
    try {
        const pokemons = await pokeApi.getPokemons(offset, limit); // Chama a API
        const newHtml = pokemons.map(convertPokemonToLi).join(''); // Converte e junta os Pokémon
        pokemonList.innerHTML += newHtml; // Adiciona à lista
    } catch (error) {
        console.error('Erro ao carregar Pokémon:', error);
    }
}

// Carrega os Pokémon iniciais
loadPokemonItens(offset, limit);

// Adiciona funcionalidade ao botão Load More
loadMoreButton.addEventListener('click', () => {
    offset += limit; 
    const qtdRecordsWithNextPage = offset + limit; 

    if (qtdRecordsWithNextPage >= maxRecords) {
        const newLimit = maxRecords - offset; 
        loadPokemonItens(offset, newLimit);
        loadMoreButton.parentElement.removeChild(loadMoreButton); 
    } else {
        loadPokemonItens(offset, limit);
    }
});

// Função para alternar a exibição dos detalhes do Pokémon
function toggleDetails(event) {
    const extraDetails = event.currentTarget.querySelector('.extra-details');
    if (extraDetails.style.display === 'none' || !extraDetails.style.display) {
        extraDetails.style.display = 'block';
    } else {
        extraDetails.style.display = 'none';
    }
}

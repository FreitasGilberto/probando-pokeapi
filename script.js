const searchInput = document.getElementById('search-input');
const searchButton = document.getElementById('search-button');
const pokemonInfo = document.getElementById('pokemon-info');

searchButton.addEventListener('click', () => {
    const searchQuery = searchInput.value.toLowerCase();
    searchPokemon(searchQuery);
});

searchInput.addEventListener('keyup', (event) => {
    if (event.keyCode === 13) {
        event.preventDefault();
        searchButton.click();
    }
});

async function searchPokemon(query) {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${query}`);
    const data = await response.json();

    const name = data.name;
    const image = data.sprites.front_default;
    const abilities = data.abilities.map(ability => ability.ability.name);
    const stats = data.stats.map(stat => [stat.stat.name, stat.base_stat]);
    const types = data.types.map(type => type.type.name);
    const weight = data.weight / 10; // Convertimos de hectogramos a kilogramos
    const height = data.height / 10; // Convertimos de decímetros a metros

    pokemonInfo.innerHTML = `
        <h2>${name}</h2>
        <img src="${image}">
        <table>
            <tr><th>Habilidades:</th><td>${abilities.join(', ')}</td></tr>
            <tr><th>Estadísticas:</th><td>${stats.map(stat => `${stat[0]}: ${stat[1]}`).join('<br>')}</td></tr>
            <tr><th>Tipo:</th><td>${types.join(', ')}</td></tr>
            <tr><th>Peso:</th><td>${weight} kg</td></tr>
            <tr><th>Altura:</th><td>${height} m</td></tr>
        </table>
    `;
    
    pokemonInfo.style.display = 'block'; }
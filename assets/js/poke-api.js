const pokeApi = {};

function convertPokeApiDetailToPokemon(pokeDetail) {
    const pokemon = new Pokemon();
    pokemon.number = pokeDetail.id
    pokemon.name = pokeDetail.name;

    const types = pokeDetail.types.map((typeSlot) => typeSlot.type.name);
    const [type] = types;

    pokemon.types = types;
    pokemon.type = type;

    pokemon.photo = pokeDetail.sprites.other.dream_world.front_default;

    return pokemon;
}

function convertPokeApiDetailToAdvancedDetails(pokeDetail) {
    const advancedDetails = new AdvancedDetails();
    advancedDetails.height = pokeDetail.height;
    advancedDetails.weight = pokeDetail.weight;

    const abilities = pokeDetail.abilities.map((abilitySlot) => abilitySlot.ability.name);
    advancedDetails.abilities = abilities;

    const baseStats = {
        hp: 0,
        attack: 0,
        defense: 0,
        spAtk: 0,
        spDef: 0,
        speed: 0,
    };
    pokeDetail.stats.map((statSlot) => {
        const statName = statSlot.stat.name;

        switch (statName) {
            case "hp":
                baseStats.hp = statSlot.base_stat;
                break;
            case "attack":
                baseStats.attack = statSlot.base_stat;
                break;
            case "defense":
                baseStats.defense = statSlot.base_stat;
                break;
            case "special-attack":
                baseStats.spAtk = statSlot.base_stat;
                break;
            case "special-defense":
                baseStats.spDef = statSlot.base_stat;
                break;
            case "speed":
                baseStats.speed = statSlot.base_stat;
                break;
        }
    });
    advancedDetails.baseStats = baseStats;

    return advancedDetails;
}

pokeApi.getPokemonDetail = (pokemon) => {
    return fetch(pokemon.url)
        .then((response) => response.json())
        .then(convertPokeApiDetailToPokemon);
};

pokeApi.getPokemonAdvancedDetails = (pokemon) => {
    const url = `https://pokeapi.co/api/v2/pokemon/${pokemon}/`;

    return fetch(url)
        .then((response) => response.json())
        .then((pokemonData) => Promise.all([
            convertPokeApiDetailToPokemon(pokemonData),
            convertPokeApiDetailToAdvancedDetails(pokemonData)
        ]))
        .then((pokemonDetails) => pokemonDetails);
};

pokeApi.getPokemons = (offset = 0, limit = 5) => {
    const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`;

    return fetch(url)
        .then((response) => response.json())
        .then((jsonBody) => jsonBody.results)
        .then((pokemons) => pokemons.map(pokeApi.getPokemonDetail))
        .then((detailRequests) => Promise.all(detailRequests))
        .then((pokemonsDetails) => pokemonsDetails);
};

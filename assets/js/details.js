function exibeDetalhesDoPokemon(name) {
    pokeApi.getPokemonAdvancedDetails(pokemonName).then((details) => {
        const [basic, advanced] = details;
        const newHtml = `
            <a class="return" href="/index.html">&xlarr;</a>
            <div class="basic-details">
                <div class="nameAndTypes">
                    <h1 class="name">${basic.name}</h1>
                    <ol class="types">
                        ${basic.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                    </ol>
                </div>
                <span class="number">#${basic.number}</span>
            </div>
            <div class="pokemon-photo">
                <img src="${basic.photo}" alt="${basic.name}}">
            </div>
            <div class="advanced-details">
                <div class="about">
                    <h3>About</h3>
                    <div class="informations">
                        <div class="information">
                            <span>Height</span>
                            <p>${convertDecimeterToCentimeters(advanced.height)} cm</p>
                        </div>
                        <div class="information">
                            <span>Weight</span>
                            <p>${convertHectogramToKilogram(advanced.weight)} Km</p>
                        </div>
                        <div class="information">
                            <span>Abilities</span>
                            <ul class="abilities">
                                ${advanced.abilities.map((ability) => `<li>${formatString(ability)}</li>`).join('')}
                            </ul>
                        </div>
                    </div>
                </div>
                <div class="base-stats">
                    <h3>Base Stats</h3>
                    <div class="stats">
                        <div class="stat">
                            <span>HP</span>
                            <p>${advanced.baseStats.hp}</p>
                        </div>
                        <div class="stat">
                            <span>Attack</span>
                            <p>${advanced.baseStats.attack}</p>
                        </div>
                        <div class="stat">
                            <span>Defense</span>
                            <p>${advanced.baseStats.defense}</p>
                        </div>
                        <div class="stat">
                            <span>Sp. Atk</span>
                            <p>${advanced.baseStats.spAtk}</p>
                        </div>
                        <div class="stat">
                            <span>Sp. Def</span>
                            <p>${advanced.baseStats.spDef}</p>
                        </div>
                        <div class="stat">
                            <span>Speed</span>
                            <p>${advanced.baseStats.speed}</p>
                        </div>
                    </div>
                </div>
            </div>
        `;

        sectionContent.innerHTML = newHtml;

        // Adiciona a cor de background à pagina do pokémon
        alteraCorDeBackground(sectionContent, basic.type);
    });
}

function alteraCorDeBackground(element, color) {
    element.classList.add(color);
}

function convertDecimeterToCentimeters(dm) {
    return dm * 10;
}

function convertHectogramToKilogram(hg) {
    return hg / 10;
}

function formatString(str) {
    if (str.includes('-')) {
        const words = str.split('-');

        for (let i = 0; i < words.length; i++) {
            words[i] = words[i][0].toUpperCase() + words[i].substring(1);
        }

        return words.join(' ');
    } else {
        return str[0].toUpperCase() + str.substring(1);
    }
}

const sectionContent = document.getElementsByClassName('content')[0];

// Recebendo o nome do pokemon cujos detalhes devem ser exibidos
const urlParams = new URLSearchParams(location.search);
const pokemonName = urlParams.get('pkmn');

exibeDetalhesDoPokemon(pokemonName);

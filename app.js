const pokemonList = document.querySelector("#pokemonList");

const defaultPokemon = "https://pokeapi.co/api/v2/pokemon/1/";
const pokemonCard = document.querySelector("#pokemonCard");

window.addEventListener("load", (e) => {
  getPokemonList().then(() => {
    showPokemonCard(defaultPokemon);
  });

  pokemonList.addEventListener("change", (e) => {
    showPokemonCard(e.target.value);
  });

  registerServiceWorker();
});

async function getPokemonList() {
  const pokemonUrl = "https://pokeapi.co/api/v2/pokemon?limit=35";

  try {
    const response = await fetch(pokemonUrl);
    const data = await response.json();

    pokemonList.innerHTML = data.results.map(
      (result) => ` <option value="${result.url}">${result.name}</option>`
    );
  } catch (error) {
    console.log(error);
  }
}

async function showPokemonCard(url) {
  try {
    const response = await fetch(url);
    const data = await response.json();

    pokemonCard.innerHTML = createCard(data);
  } catch (error) {
    console.log("Network is unavailable!");
    pokemonCard.innerHTML = offlineCard();
  }
}

function createCard(pokemon) {
  return `
    <div class="card-header">
    <h2>${pokemon.id}</h2>
  </div>
  <img
    src="${pokemon.sprites.other.dream_world.front_default}"
    class="card-img-top"
    width="150"
    height="150"
    alt="${pokemon.name}"
  />
  <div class="card-body">
    <h3 class="card-title" style="text-transform: capitalize">
      ${pokemon.name}
    </h3>
    <div class="badge badge-warning">Height: ${pokemon.height}</div>
    <div class="badge badge-danger">Weight: ${pokemon.weight}</div>
  </div>
    `;
}

function offlineCard() {
  return `
    <div class="card-header">
    <p>Network is unavailable.</p>
  </div>
  
    `;
}

async function registerServiceWorker() {
  if ("serviceWorker" in navigator) {
    try {
      await navigator.serviceWorker.register("sw.js");
    } catch (error) {
      console.log("Failed: ", error);
    }
  }
}

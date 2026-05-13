export type PokemonListItem = {
  name: string;
  url: string;
};

export type PokemonDetails = {
  abilities: {
    ability: {
      name: string;
    };
  }[];
  base_experience: number;
  height: number;
  id: number;
  name: string;
  sprites: {
    other?: {
      "official-artwork"?: {
        front_default?: string | null;
      };
    };
  };
  stats: {
    base_stat: number;
    stat: {
      name: string;
    };
  }[];
  types: {
    type: {
      name: string;
    };
  }[];
  weight: number;
};

type PokemonListResponse = {
  results: PokemonListItem[];
};

const POKEMON_LIST_URL = "https://pokeapi.co/api/v2/pokemon";
const POKEMON_IMAGE_BASE_URL =
  "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork";

export async function fetchPokemonList(limit = 40) {
  const response = await fetch(`${POKEMON_LIST_URL}?limit=${limit}`);

  if (!response.ok) {
    throw new Error("Unable to load Pokemon.");
  }

  const data = (await response.json()) as PokemonListResponse;
  return data.results;
}

export async function fetchPokemonDetails(id: string) {
  const response = await fetch(`${POKEMON_LIST_URL}/${id}`);

  if (!response.ok) {
    throw new Error("Unable to load Pokemon details.");
  }

  return (await response.json()) as PokemonDetails;
}

export function getPokemonId(url: string) {
  const parts = url.split("/").filter(Boolean);
  return parts[parts.length - 1] ?? "";
}

export function getPokemonImageUrl(id: string) {
  return `${POKEMON_IMAGE_BASE_URL}/${id}.png`;
}

export function getPokemonArtwork(pokemon: PokemonDetails) {
  return (
    pokemon.sprites.other?.["official-artwork"]?.front_default ??
    getPokemonImageUrl(String(pokemon.id))
  );
}

export function formatPokemonName(name: string) {
  return name
    .split("-")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

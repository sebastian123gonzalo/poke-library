import { Pokemon } from "../models/pokemon";

export const fetchAllPokemon = async (): Promise<Pokemon[]> => {
  const res = await fetch("https://pokeapi.co/api/v2/pokemon?limit=1302");
  const data = await res.json();

  const pokemonDetails: Pokemon[] = await Promise.all(
    data.results.map(async (pokemon: { name: string; url: string }) => {
      const detailsRes = await fetch(pokemon.url);
      const details = await detailsRes.json();

      return {
        id: details.id,
        name: details.name,
        image: details.sprites.front_default || "/images/imageNotfound.png", 
      };
    })
  );

  return pokemonDetails;
};

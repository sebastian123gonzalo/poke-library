import { Pokemon } from "../models/pokemon";

export const fetchAllPokemon = async (): Promise<Pokemon[]> => {
  try {
    const res = await fetch("https://pokeapi.co/api/v2/pokemon?limit=1302");
    if (!res.ok) throw new Error("Failed to fetch Pokemon list");
    
    const data = await res.json();
    const pokemonDetails: Pokemon[] = await Promise.all(
      data.results.map(async (pokemon: { name: string; url: string }) => {
        const detailsRes = await fetch(pokemon.url);
        if (!detailsRes.ok) throw new Error("Failed to fetch Pokemon details");
        
        const details = await detailsRes.json();
        return {
          id: details.id,
          name: details.name,
          image: details.sprites.front_default || "/images/imageNotFound.png",
        };
      })
    );
    
    return pokemonDetails;
  } catch (error) {
    console.error("Error fetching Pokemon list:", error);
    return [];
  }
};
import { EvolutionChain } from "../models/evolutionChain";

export const fetchPokemonEvolution = async (speciesUrl: string): Promise<EvolutionChain[]> => {
  try {
    // Fetch species data to get the evolution chain URL
    const speciesRes = await fetch(speciesUrl);
    const speciesData = await speciesRes.json();

    const evolutionChainUrl = speciesData.evolution_chain.url;

    // Fetch the actual evolution chain data
    const evolutionRes = await fetch(evolutionChainUrl);
    const evolutionData = await evolutionRes.json();

    // Extract evolution details recursively
    const extractEvolutions = (chain: any): EvolutionChain[] => {
      let evolutions: EvolutionChain[] = [];

      if (chain) {
        evolutions.push({
          name: chain.species.name,
          image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${chain.species.url.split("/").slice(-2, -1)}.png`,
        });

        chain.evolves_to.forEach((evolution: any) => {
          evolutions = evolutions.concat(extractEvolutions(evolution));
        });
      }
      return evolutions;
    };

    return extractEvolutions(evolutionData.chain);
  } catch (error) {
    console.error("Error fetching evolution chain:", error);
    return [];
  }
};

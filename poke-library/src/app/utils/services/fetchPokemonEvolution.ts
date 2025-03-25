import { EvolutionChain } from "../models/evolutionChain";

interface EvolutionSpecies {
  name: string;
  url: string;
}

interface EvolutionStep {
  species: EvolutionSpecies;
  evolves_to: EvolutionStep[];
}

 
const extractEvolutions = (node: EvolutionStep, evolutions: EvolutionChain[] = []): EvolutionChain[] => {
  if (!node) return evolutions;

  const id = node.species.url.split("/").slice(-2, -1)[0];

  evolutions.push({
    name: node.species.name,
    image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`,
  });

  if (node.evolves_to.length > 0) {
    return extractEvolutions(node.evolves_to[0], evolutions);
  }

  return evolutions;
};
 
export const fetchPokemonEvolution = async (speciesUrl: string): Promise<EvolutionChain[]> => {
  try {
    const speciesRes = await fetch(speciesUrl);
    const speciesData = await speciesRes.json();

    const evolutionChainUrl = speciesData.evolution_chain.url;
    const evolutionRes = await fetch(evolutionChainUrl);
    const evolutionData = await evolutionRes.json();

    return extractEvolutions(evolutionData.chain);
  } catch (error) {
    console.error("Error fetching evolution data:", error);
    return [];
  }
};

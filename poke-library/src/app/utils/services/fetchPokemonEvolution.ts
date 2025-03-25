import { EvolutionChain } from "../models/evolutionChain";

interface SpeciesData {
  evolution_chain: {
    url: string;
  };
}

interface EvolutionData {
  chain: EvolutionNode;
}

interface EvolutionNode {
  species: {
    name: string;
    url: string;
  };
  evolves_to: EvolutionNode[];
}

export const fetchPokemonEvolution = async (speciesUrl: string): Promise<EvolutionChain[]> => {
  const res = await fetch(speciesUrl);
  const data: SpeciesData = await res.json();

  const evolutionChainUrl = data.evolution_chain.url;
  const evolutionRes = await fetch(evolutionChainUrl);
  const evolutionData: EvolutionData = await evolutionRes.json();

  const evolutions: EvolutionChain[] = [];
  let current: EvolutionNode | undefined = evolutionData.chain;

  while (current) {
    evolutions.push({
      name: current.species.name,
      image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${current.species.url.split("/").slice(-2, -1)[0]}.png`,
    });

    // Si hay más evoluciones, tomamos la primera de la lista
    current = current.evolves_to.length > 0 ? current.evolves_to[0] : undefined;
  }

  return evolutions;
};

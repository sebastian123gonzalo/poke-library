"use client";

import { useEffect, useState } from "react";
import { fetchAllPokemon } from "../utils/services/fetchAllPokemons";
import { Pokemon } from "../utils/models/pokemon";
import DetailPokemon from "./detailPokemon";

export default function ListPokemons() {
  const [pokemonList, setPokemonList] = useState<Pokemon[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [selectedPokemon, setSelectedPokemon] = useState<Pokemon | null>(null);

  useEffect(() => {
    const getPokemon = async () => {
      setIsLoading(true);
      const data = await fetchAllPokemon();
      setPokemonList(data);
      setIsLoading(false);
    };
    getPokemon();
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center">
      <h1 className="text-4xl font-bold my-8">Pokédex</h1>

      {isLoading && (
        <div className="flex flex-col justify-center items-center h-200">
          <div className="w-16 h-16 border-4 border-amber-500 border-t-transparent rounded-full animate-spin"></div>
          <div className="text-2xl font-bold mt-6 text-amber-300 text-center">Loading, please wait a moment...</div>
        </div>
      )}

      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6 px-6">
        {pokemonList.map((pokemon) => (
          <div key={pokemon.id} className="bg-gray-800 p-4 rounded-lg shadow-lg flex flex-col items-center">
            <img src={pokemon.image} alt={pokemon.name} className="w-20 h-20" />
            <h2 className="capitalize text-lg font-bold">{pokemon.name}</h2>
            <button
              className="bg-yellow-500 text-black px-4 py-2 font-normal rounded-md mt-4 cursor-pointer"
              onClick={() => setSelectedPokemon(pokemon)}
            >
              Details
            </button>
          </div>
        ))}
      </div>

      {/* Modal for Pokemon Details */}
      {selectedPokemon && (
        <DetailPokemon
          id={selectedPokemon.id}
          name={selectedPokemon.name}
          image={selectedPokemon.image}
          speciesUrl={`https://pokeapi.co/api/v2/pokemon-species/${selectedPokemon.id}/`}
          onClose={() => setSelectedPokemon(null)}
        />
      )}
    </div>
  );
}

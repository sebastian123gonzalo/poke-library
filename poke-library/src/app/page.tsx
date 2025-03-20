"use client";

import { useEffect, useState } from "react";
import { fetchAllPokemon } from "./utils/services/fetchPokemon";
import { Pokemon } from "./utils/models/pokemon";

export default function Home() {
  const [pokemonList, setPokemonList] = useState<Pokemon[]>([]);

  useEffect(() => {
    const getPokemon = async () => {
      const data = await fetchAllPokemon();
      setPokemonList(data);
    };
    getPokemon();
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center">
      <h1 className="text-4xl font-bold my-8">Pokédex</h1>
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
        {pokemonList.map((pokemon) => (
          <div key={pokemon.id} className="bg-gray-800 p-4 rounded-lg shadow-lg flex flex-col items-center">
            <img src={pokemon.image} alt={pokemon.name} className="w-20 h-20" />
            <h2 className="capitalize text-lg">{pokemon.name}</h2>
          </div>
        ))}
      </div>
    </div>
  );
}

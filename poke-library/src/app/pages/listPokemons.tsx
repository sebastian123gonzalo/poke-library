"use client";
import { useEffect, useState } from "react";
import { fetchAllPokemon } from "../utils/services/fetchAllPokemons";
import { Pokemon } from "../utils/models/pokemon";
import DetailPokemon from "../pages/detailPokemon";
import Image from "next/image";
import ClipLoader from "react-spinners/ClipLoader";  

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

      {isLoading ? (
        <div className="flex justify-center items-center h-200">
          <ClipLoader color="#FFD700" size={50} /> {/* Spinner dorado */}
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6 px-6">
          {pokemonList.map((pokemon) => (
            <div key={pokemon.id} className="bg-gray-800 p-4 rounded-lg shadow-lg flex flex-col items-center">
              <Image src={pokemon.image} alt={pokemon.name} width={80} height={80} />
              <h2 className="capitalize text-lg font-bold">{pokemon.name}</h2>
              <button className="bg-yellow-500 px-4 py-2 rounded mt-4 cursor-pointer" onClick={() => setSelectedPokemon(pokemon)}>
                Details
              </button>
            </div>
          ))}
        </div>
      )}

      {selectedPokemon && <DetailPokemon {...selectedPokemon} speciesUrl={`https://pokeapi.co/api/v2/pokemon-species/${selectedPokemon.id}/`} onClose={() => setSelectedPokemon(null)} />}
    </div>
  );
}

"use client";

import { useEffect, useState } from "react";
import { fetchPokemonEvolution } from "../utils/services/fetchPokemonEvolution";
import { EvolutionChain } from "../utils/models/evolutionChain";

interface DetailPokemonProps {
  id: number;
  name: string;
  image: string;
  speciesUrl: string;
  onClose: () => void;
}

export default function DetailPokemon({ id, name, image, speciesUrl, onClose }: DetailPokemonProps) {
  const [evolutions, setEvolutions] = useState<EvolutionChain[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const getEvolutions = async () => {
      setIsLoading(true);
      const data = await fetchPokemonEvolution(speciesUrl);
      setEvolutions(data);
      setIsLoading(false);
    };
    getEvolutions();
  }, [speciesUrl]);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-gray-900 text-white p-6 rounded-lg shadow-lg w-96 relative">
        <button className="absolute top-4 right-4 text-2xl text-red-500" onClick={onClose}>
          ✖
        </button>
        <h2 className="text-2xl font-bold text-center capitalize">Name: {name} / Id: {id}</h2>
        <img src={image} alt={name} className="w-32 h-32 mx-auto" />

        <h3 className="text-lg font-semibold mt-4 text-center">Evolution chain</h3>

        {isLoading ? (
          <p className="text-center text-yellow-300">Loading...</p>
        ) : (
          <div className="flex flex-wrap justify-center gap-4 mt-4">
            {evolutions.map((evo) => (
              <div key={evo.name} className="flex flex-col items-center">
                <img src={evo.image} alt={evo.name} className="w-16 h-16" />
                <p className="capitalize">{evo.name}</p>
              </div>
            ))}
          </div>
        )}

        <button
          className="w-full bg-red-500 text-white font-bold py-2 px-4 rounded mt-6 hover:bg-red-600 cursor-pointer" 
          onClick={onClose}
        >
          Close
        </button>
      </div>
    </div>
  );
}

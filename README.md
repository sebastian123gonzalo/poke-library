# Pokédex - Next.js App

## Descripción
Una aplicación web desarrollada con **Next.js** que muestra una lista de Pokémon obtenidos desde la **PokeAPI**. Permite visualizar detalles de cada Pokémon, incluyendo su evolución, con una interfaz moderna y responsiva.

## Tecnologías Utilizadas
- **Next.js** - Framework para React.
- **TypeScript** - Tipado estático para mejorar la seguridad del código.
- **Tailwind CSS** - Para el diseño y estilos.
- **PokeAPI** - API para obtener la información de los Pokémon.
- **react-spinners** - Para mostrar un **spinner** de carga.
- **Next Image** - Optimiza las imágenes en la aplicación.

## Características
✅ Listado de Pokémon con imagen y nombre.  
✅ Visualización de detalles de cada Pokémon.  
✅ Mostrar evolución del Pokémon con imágenes.   
✅ Interfaz responsiva   

## Instalación
1. Clonar el repositorio:
   ```sh
   git clone https://github.com/sebastian123gonzalo/poke-library.git
   cd pokedex-nextjs
   ```
2. Instalar dependencias:
   ```sh
   npm install
   ```
3. Ejecutar la aplicación en modo desarrollo:
   ```sh
   npm run dev
   ```
4. Abrir en el navegador: [http://localhost:3000](http://localhost:3000)

## Estructura del Proyecto
```
/pokedex-nextjs
├── pages
│   ├── index.tsx   # Página principal con la lista de Pokémon
│   ├── detailPokemon.tsx   # Componente de detalle del Pokémon
├── utils
│   ├── services
│   │   ├── fetchAllPokemons.ts   # Función para obtener la lista de Pokémon
│   │   ├── fetchPokemonEvolution.ts   # Función para obtener la evolución de un Pokémon
│   ├── models
│   │   ├── pokemon.ts   # Modelo de datos para un Pokémon
│   │   ├── evolutionChain.ts   # Modelo de datos para la evolución de un Pokémon
├── components
│   ├── ListPokemons.tsx   # Componente de la lista de Pokémon
│   ├── DetailPokemon.tsx   # Componente de detalles de un Pokémon
├── styles
│   ├── globals.css   # Estilos globales con Tailwind CSS 
``` 

## Créditos
Inspirado en la PokeAPI.   


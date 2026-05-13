import { create } from "zustand";

import type { PokemonListItem } from "@/api/pokemon";

export type FavouritePokemon = PokemonListItem & {
  id: string;
};

type FavouritesState = {
  favourites: FavouritePokemon[];
  isFavourite: (id: string) => boolean;
  toggleFavourite: (pokemon: PokemonListItem, id: string) => void;
};

export const useFavouritesStore = create<FavouritesState>((set, get) => ({
  favourites: [],
  isFavourite: (id: string) => {
    return get().favourites.some((fav) => fav.id === id);
  },
  toggleFavourite: (pokemon: PokemonListItem, id: string) => {
    set((state) => {
      const isCurrentlyFavourite = state.favourites.some(
        (fav) => fav.id === id,
      );

      if (isCurrentlyFavourite) {
        return {
          favourites: state.favourites.filter((fav) => fav.id !== id),
        };
      }

      return {
        favourites: [...state.favourites, { ...pokemon, id }],
      };
    });
  },
}));

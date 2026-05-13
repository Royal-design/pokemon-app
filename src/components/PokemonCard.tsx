import { useRouter } from "expo-router";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";

import {
  formatPokemonName,
  getPokemonId,
  getPokemonImageUrl,
  type PokemonListItem,
} from "@/api/pokemon";
import { colors } from "@/global";
import { useFavouritesStore } from "@/store/useFavouritesStore";

type PokemonCardProps = {
  pokemon: PokemonListItem;
};

export function PokemonCard({ pokemon }: PokemonCardProps) {
  const router = useRouter();
  const id = getPokemonId(pokemon.url);
  const imageUrl = getPokemonImageUrl(id);
  const { isFavourite, toggleFavourite } = useFavouritesStore();
  const isFav = isFavourite(id);

  const handleFavouritePress = () => {
    toggleFavourite(pokemon, id);
  };

  return (
    <Pressable
      onPress={() => {
        router.push({
          pathname: "/pokemon/[id]",
          params: { id },
        });
      }}
      style={styles.card}
    >
      <View style={styles.artworkFrame}>
        <Image
          accessibilityLabel={formatPokemonName(pokemon.name)}
          resizeMode="contain"
          source={{ uri: imageUrl }}
          style={styles.artwork}
        />
      </View>
      <View style={styles.content}>
        <Text style={styles.name}>{formatPokemonName(pokemon.name)}</Text>
        <Text style={styles.meta}>Pokemon #{id.padStart(3, "0")}</Text>
      </View>
      <Pressable onPress={handleFavouritePress} style={styles.favouriteButton}>
        <Text style={[styles.heart, isFav && styles.heartActive]}>
          {isFav ? "♥" : "♡"}
        </Text>
      </Pressable>
      <Text style={styles.chevron}>{">"}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  artwork: {
    width: 66,
    height: 66,
  },
  artworkFrame: {
    alignItems: "center",
    justifyContent: "center",
    width: 72,
    height: 72,
    borderRadius: 8,
    backgroundColor: "#EEF5F2",
  },
  card: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
    minHeight: 92,
    padding: 14,
    borderRadius: 8,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
  },
  chevron: {
    color: colors.textMuted,
    fontSize: 24,
    fontWeight: "700",
  },
  content: {
    flex: 1,
    gap: 4,
  },
  favouriteButton: {
    padding: 8,
  },
  heart: {
    fontSize: 24,
    color: colors.textMuted,
  },
  heartActive: {
    color: "#E11D48",
  },
  meta: {
    color: colors.textMuted,
    fontSize: 13,
    fontWeight: "600",
  },
  name: {
    color: colors.text,
    fontSize: 18,
    fontWeight: "700",
  },
});

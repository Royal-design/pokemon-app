import { useRouter } from "expo-router";
import {
  FlatList,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";

import { formatPokemonName, getPokemonImageUrl } from "@/api/pokemon";
import { colors } from "@/global";
import { useFavouritesStore } from "@/store/useFavouritesStore";

export default function Favourites() {
  const router = useRouter();
  const { favourites, toggleFavourite, isFavourite } = useFavouritesStore();

  const handleFavouritePress = (pokemon: (typeof favourites)[0]) => {
    toggleFavourite(pokemon, pokemon.id);
  };

  if (favourites.length === 0) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Favourites</Text>
        <View style={styles.emptyState}>
          <Text style={styles.emptyIcon}>♡</Text>
          <Text style={styles.emptyTitle}>No favourites yet</Text>
          <Text style={styles.emptySubtitle}>
            Tap the heart icon on any Pokemon to add it to your favourites.
          </Text>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Favourites</Text>
      <Text style={styles.subtitle}>{favourites.length} Pokemon saved</Text>

      <FlatList
        contentContainerStyle={styles.listContent}
        data={favourites}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => {
          const imageUrl = getPokemonImageUrl(item.id);
          const isFav = isFavourite(item.id);

          return (
            <Pressable
              onPress={() => {
                router.push({
                  pathname: "/pokemon/[id]",
                  params: { id: item.id },
                });
              }}
              style={styles.card}
            >
              <View style={styles.artworkFrame}>
                <Image
                  accessibilityLabel={formatPokemonName(item.name)}
                  resizeMode="contain"
                  source={{ uri: imageUrl }}
                  style={styles.artwork}
                />
              </View>
              <View style={styles.content}>
                <Text style={styles.name}>{formatPokemonName(item.name)}</Text>
                <Text style={styles.meta}>
                  Pokemon #{item.id.padStart(3, "0")}
                </Text>
              </View>
              <Pressable
                onPress={() => handleFavouritePress(item)}
                style={styles.favouriteButton}
              >
                <Text style={[styles.heart, isFav && styles.heartActive]}>
                  {isFav ? "♥" : "♡"}
                </Text>
              </Pressable>
              <Text style={styles.chevron}>{">"}</Text>
            </Pressable>
          );
        }}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: colors.background,
  },
  title: {
    color: colors.text,
    fontSize: 32,
    fontWeight: "700",
  },
  subtitle: {
    marginTop: 8,
    color: colors.textMuted,
    fontSize: 16,
  },
  listContent: {
    gap: 12,
    paddingBottom: 24,
    paddingTop: 24,
  },
  emptyState: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: 12,
  },
  emptyIcon: {
    fontSize: 64,
    color: colors.textMuted,
  },
  emptyTitle: {
    color: colors.text,
    fontSize: 24,
    fontWeight: "700",
  },
  emptySubtitle: {
    color: colors.textMuted,
    fontSize: 16,
    textAlign: "center",
    paddingHorizontal: 32,
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
  artworkFrame: {
    alignItems: "center",
    justifyContent: "center",
    width: 72,
    height: 72,
    borderRadius: 8,
    backgroundColor: "#EEF5F2",
  },
  artwork: {
    width: 66,
    height: 66,
  },
  content: {
    flex: 1,
    gap: 4,
  },
  name: {
    color: colors.text,
    fontSize: 18,
    fontWeight: "700",
  },
  meta: {
    color: colors.textMuted,
    fontSize: 13,
    fontWeight: "600",
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
  chevron: {
    color: colors.textMuted,
    fontSize: 24,
    fontWeight: "700",
  },
});

import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  View,
} from "react-native";

import { fetchPokemonList, type PokemonListItem } from "@/api/pokemon";
import { PokemonCard } from "@/components/PokemonCard";
import { colors } from "@/global";

export default function Pokemon() {
  const [pokemon, setPokemon] = useState<PokemonListItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    async function loadPokemon() {
      try {
        const results = await fetchPokemonList();

        if (isMounted) {
          setPokemon(results);
          setErrorMessage(null);
        }
      } catch (error) {
        if (isMounted) {
          setErrorMessage(
            error instanceof Error ? error.message : "Unable to load Pokemon.",
          );
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }

    loadPokemon();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Pokemon</Text>
      <Text style={styles.subtitle}>Browse the first 40 Pokemon.</Text>

      {isLoading ? (
        <View style={styles.stateContainer}>
          <ActivityIndicator color={colors.primary} size="large" />
          <Text style={styles.stateText}>Loading Pokemon...</Text>
        </View>
      ) : errorMessage ? (
        <View style={styles.stateContainer}>
          <Text style={styles.errorText}>{errorMessage}</Text>
        </View>
      ) : (
        <FlatList
          contentContainerStyle={styles.listContent}
          data={pokemon}
          keyExtractor={(item) => item.name}
          renderItem={({ item }) => <PokemonCard pokemon={item} />}
          showsVerticalScrollIndicator={false}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: colors.background,
  },
  errorText: {
    color: "#B42318",
    fontSize: 16,
    fontWeight: "600",
    textAlign: "center",
  },
  listContent: {
    gap: 12,
    paddingBottom: 24,
    paddingTop: 24,
  },
  stateContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: 12,
  },
  stateText: {
    color: colors.textMuted,
    fontSize: 16,
  },
  subtitle: {
    marginTop: 8,
    color: colors.textMuted,
    fontSize: 16,
  },
  title: {
    color: colors.text,
    fontSize: 32,
    fontWeight: "700",
  },
});

import { useEffect, useMemo, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

import { fetchPokemonList, type PokemonListItem } from "@/api/pokemon";
import { PokemonCard } from "@/components/PokemonCard";
import { colors } from "@/global";

export default function Pokemon() {
  const [pokemon, setPokemon] = useState<PokemonListItem[]>([]);
  const [search, setSearch] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isFocused, setIsFocused] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);

  async function loadPokemon(refresh = false) {
    try {
      if (refresh) {
        setIsRefreshing(true);
      } else {
        setIsLoading(true);
      }

      const results = await fetchPokemonList();

      setPokemon(results);
      setErrorMessage(null);
    } catch (error) {
      setErrorMessage(
        error instanceof Error ? error.message : "Unable to load Pokemon.",
      );
    } finally {
      setIsLoading(false);
      setIsRefreshing(false);
    }
  }

  useEffect(() => {
    loadPokemon();
  }, []);

  const filteredPokemon = useMemo(() => {
    return pokemon.filter((item) =>
      item.name.toLowerCase().includes(search.toLowerCase()),
    );
  }, [pokemon, search]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Pokemon</Text>
      <Text style={styles.subtitle}>Browse the first 40 Pokemon.</Text>

      <TextInput
        placeholder="Search Pokemon..."
        placeholderTextColor={colors.textMuted}
        style={[styles.searchInput, isFocused && styles.searchInputFocused]}
        value={search}
        onChangeText={setSearch}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
      />

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
          data={filteredPokemon}
          keyExtractor={(item) => item.name}
          renderItem={({ item }) => <PokemonCard pokemon={item} />}
          showsVerticalScrollIndicator={false}
          refreshing={isRefreshing}
          onRefresh={() => loadPokemon(true)}
          ListEmptyComponent={
            <View style={styles.stateContainer}>
              <Text style={styles.stateText}>
                No Pokemon found for {search}
              </Text>
            </View>
          }
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
  searchInput: {
    marginTop: 20,
    paddingHorizontal: 0,
    paddingVertical: 14,
    fontSize: 16,
    color: colors.text,
    backgroundColor: "transparent",
    borderWidth: 0,
  },

  searchInputFocused: {
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: colors.primary,
    borderRadius: 12,
    backgroundColor: "#FFFFFF",
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

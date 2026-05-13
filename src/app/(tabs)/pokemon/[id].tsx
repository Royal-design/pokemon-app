import { Stack, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Image,
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

import {
  fetchPokemonDetails,
  formatPokemonName,
  getPokemonArtwork,
  type PokemonDetails,
} from "@/api/pokemon";
import { colors } from "@/global";
import { useFavouritesStore } from "@/store/useFavouritesStore";

export default function PokemonDetails() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { isFavourite, toggleFavourite } = useFavouritesStore();
  const [pokemon, setPokemon] = useState<PokemonDetails | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isStatsModalVisible, setIsStatsModalVisible] = useState(false);

  useEffect(() => {
    let isMounted = true;

    async function loadPokemonDetails() {
      try {
        const details = await fetchPokemonDetails(id);

        if (isMounted) {
          setPokemon(details);
          setErrorMessage(null);
        }
      } catch (error) {
        if (isMounted) {
          setErrorMessage(
            error instanceof Error
              ? error.message
              : "Unable to load Pokemon details.",
          );
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }

    loadPokemonDetails();

    return () => {
      isMounted = false;
    };
  }, [id]);

  if (isLoading) {
    return (
      <View style={styles.stateContainer}>
        <Stack.Screen options={{ title: "Loading..." }} />
        <ActivityIndicator color={colors.primary} size="large" />
        <Text style={styles.stateText}>Loading Pokemon details...</Text>
      </View>
    );
  }

  if (errorMessage || !pokemon) {
    return (
      <View style={styles.stateContainer}>
        <Stack.Screen options={{ title: "Pokemon Details" }} />
        <Text style={styles.errorText}>
          {errorMessage ?? "Unable to load Pokemon details."}
        </Text>
      </View>
    );
  }

  const name = formatPokemonName(pokemon.name);
  const imageUrl = getPokemonArtwork(pokemon);
  const heightInMeters = pokemon.height / 10;
  const weightInKilograms = pokemon.weight / 10;
  const isFav = isFavourite(id);

  const handleFavouritePress = () => {
    toggleFavourite(
      { name: pokemon.name, url: `https://pokeapi.co/api/v2/pokemon/${id}` },
      id,
    );
  };

  return (
    <ScrollView
      contentContainerStyle={styles.contentContainer}
      style={styles.container}
    >
      <Stack.Screen options={{ title: name }} />

      <View style={styles.hero}>
        <View style={styles.heroCopy}>
          <Text style={styles.eyebrow}>
            Pokemon #{String(pokemon.id).padStart(3, "0")}
          </Text>
          <Text style={styles.title}>{name}</Text>
          <View style={styles.typeRow}>
            {pokemon.types.map(({ type }) => (
              <View key={type.name} style={styles.typePill}>
                <Text style={styles.typeText}>
                  {formatPokemonName(type.name)}
                </Text>
              </View>
            ))}
          </View>
          <Pressable
            onPress={handleFavouritePress}
            style={styles.favouriteButton}
          >
            <Text style={[styles.heart, isFav && styles.heartActive]}>
              {isFav ? "♥ Favourite" : "♡ Add to Favourites"}
            </Text>
          </Pressable>
        </View>
        <Image
          accessibilityLabel={name}
          resizeMode="contain"
          source={{ uri: imageUrl }}
          style={styles.artwork}
        />
      </View>

      <View style={styles.metricsGrid}>
        <Metric label="Height" value={`${heightInMeters.toFixed(1)} m`} />
        <Metric label="Weight" value={`${weightInKilograms.toFixed(1)} kg`} />
        <Metric label="Base XP" value={String(pokemon.base_experience)} />
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Abilities</Text>
        <View style={styles.abilityRow}>
          {pokemon.abilities.map(({ ability }) => (
            <View key={ability.name} style={styles.abilityPill}>
              <Text style={styles.abilityText}>
                {formatPokemonName(ability.name)}
              </Text>
            </View>
          ))}
        </View>
      </View>

      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionHeaderTitle}>Base Stats</Text>
          <Pressable
            onPress={() => {
              setIsStatsModalVisible(true);
            }}
            style={styles.sectionAction}
          >
            <Text style={styles.sectionActionText}>View details</Text>
          </Pressable>
        </View>
        <View style={styles.statsList}>
          {pokemon.stats.map(({ base_stat, stat }) => (
            <View key={stat.name} style={styles.statRow}>
              <Text style={styles.statName}>
                {formatPokemonName(stat.name)}
              </Text>
              <View style={styles.statTrack}>
                <View
                  style={[
                    styles.statFill,
                    { width: `${Math.min(base_stat, 160) / 1.6}%` },
                  ]}
                />
              </View>
              <Text style={styles.statValue}>{base_stat}</Text>
            </View>
          ))}
        </View>
      </View>

      <StatsModal
        isVisible={isStatsModalVisible}
        name={name}
        onClose={() => {
          setIsStatsModalVisible(false);
        }}
        stats={pokemon.stats}
      />
    </ScrollView>
  );
}

type MetricProps = {
  label: string;
  value: string;
};

function Metric({ label, value }: MetricProps) {
  return (
    <View style={styles.metricCard}>
      <Text style={styles.metricValue}>{value}</Text>
      <Text style={styles.metricLabel}>{label}</Text>
    </View>
  );
}

type StatsModalProps = {
  isVisible: boolean;
  name: string;
  onClose: () => void;
  stats: PokemonDetails["stats"];
};

function StatsModal({ isVisible, name, onClose, stats }: StatsModalProps) {
  const totalStats = stats.reduce((total, stat) => total + stat.base_stat, 0);

  return (
    <Modal
      animationType="fade"
      onRequestClose={onClose}
      transparent
      visible={isVisible}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalCard}>
          <View style={styles.modalHeader}>
            <View>
              <Text style={styles.modalEyebrow}>Battle profile</Text>
              <Text style={styles.modalTitle}>{name} Stats</Text>
            </View>
            <Pressable onPress={onClose} style={styles.closeButton}>
              <Text style={styles.closeButtonText}>Close</Text>
            </Pressable>
          </View>

          <View style={styles.totalStatsCard}>
            <Text style={styles.totalStatsValue}>{totalStats}</Text>
            <Text style={styles.totalStatsLabel}>Total base stats</Text>
          </View>

          <View style={styles.modalStatsList}>
            {stats.map(({ base_stat, stat }) => (
              <View key={stat.name} style={styles.modalStatRow}>
                <View style={styles.modalStatHeader}>
                  <Text style={styles.modalStatName}>
                    {formatPokemonName(stat.name)}
                  </Text>
                  <Text style={styles.modalStatValue}>{base_stat}</Text>
                </View>
                <View style={styles.modalStatTrack}>
                  <View
                    style={[
                      styles.modalStatFill,
                      { width: `${Math.min(base_stat, 160) / 1.6}%` },
                    ]}
                  />
                </View>
              </View>
            ))}
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  abilityPill: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    backgroundColor: colors.primarySoft,
  },
  abilityRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
  },
  abilityText: {
    color: colors.primary,
    fontSize: 14,
    fontWeight: "700",
  },
  artwork: {
    width: 168,
    height: 168,
  },
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  contentContainer: {
    padding: 20,
    paddingBottom: 36,
  },
  errorText: {
    color: "#B42318",
    fontSize: 16,
    fontWeight: "600",
    textAlign: "center",
  },
  eyebrow: {
    color: colors.primary,
    fontSize: 13,
    fontWeight: "700",
    textTransform: "uppercase",
  },
  hero: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    minHeight: 230,
    padding: 20,
    borderRadius: 8,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
  },
  heroCopy: {
    flex: 1,
  },
  favouriteButton: {
    marginTop: 16,
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 8,
    backgroundColor: colors.primarySoft,
    alignSelf: "flex-start",
  },
  heart: {
    fontSize: 14,
    fontWeight: "700",
    color: colors.textMuted,
  },
  heartActive: {
    color: "#E11D48",
  },
  metricCard: {
    flex: 1,
    padding: 16,
    borderRadius: 8,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
  },
  metricLabel: {
    marginTop: 4,
    color: colors.textMuted,
    fontSize: 12,
    fontWeight: "700",
    textTransform: "uppercase",
  },
  metricValue: {
    color: colors.text,
    fontSize: 20,
    fontWeight: "800",
  },
  metricsGrid: {
    flexDirection: "row",
    gap: 10,
    marginTop: 14,
  },
  section: {
    marginTop: 18,
    padding: 18,
    borderRadius: 8,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
  },
  sectionAction: {
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: 8,
    backgroundColor: colors.primarySoft,
  },
  sectionActionText: {
    color: colors.primary,
    fontSize: 13,
    fontWeight: "800",
  },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 12,
    marginBottom: 14,
  },
  sectionHeaderTitle: {
    color: colors.text,
    fontSize: 18,
    fontWeight: "800",
  },
  sectionTitle: {
    marginBottom: 14,
    color: colors.text,
    fontSize: 18,
    fontWeight: "800",
  },
  closeButton: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    backgroundColor: colors.primary,
  },
  closeButtonText: {
    color: colors.surface,
    fontSize: 13,
    fontWeight: "800",
  },
  modalCard: {
    width: "100%",
    maxWidth: 520,
    maxHeight: "86%",
    padding: 20,
    borderRadius: 8,
    backgroundColor: colors.surface,
  },
  modalEyebrow: {
    color: colors.primary,
    fontSize: 12,
    fontWeight: "800",
    textTransform: "uppercase",
  },
  modalHeader: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
    gap: 16,
  },
  modalOverlay: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
    backgroundColor: "rgba(15, 23, 31, 0.48)",
  },
  modalStatFill: {
    height: "100%",
    borderRadius: 999,
    backgroundColor: colors.primary,
  },
  modalStatHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 16,
  },
  modalStatName: {
    color: colors.text,
    fontSize: 15,
    fontWeight: "800",
  },
  modalStatRow: {
    gap: 8,
  },
  modalStatsList: {
    gap: 16,
    marginTop: 18,
  },
  modalStatTrack: {
    height: 10,
    borderRadius: 999,
    backgroundColor: colors.primarySoft,
    overflow: "hidden",
  },
  modalStatValue: {
    color: colors.textMuted,
    fontSize: 15,
    fontWeight: "800",
  },
  modalTitle: {
    marginTop: 4,
    color: colors.text,
    fontSize: 22,
    fontWeight: "800",
  },
  statFill: {
    height: "100%",
    borderRadius: 999,
    backgroundColor: colors.primary,
  },
  statName: {
    width: 104,
    color: colors.text,
    fontSize: 13,
    fontWeight: "700",
  },
  statRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  statTrack: {
    flex: 1,
    height: 8,
    borderRadius: 999,
    backgroundColor: colors.primarySoft,
    overflow: "hidden",
  },
  statValue: {
    width: 32,
    color: colors.textMuted,
    fontSize: 13,
    fontWeight: "700",
    textAlign: "right",
  },
  statsList: {
    gap: 14,
  },
  totalStatsCard: {
    marginTop: 20,
    padding: 16,
    borderRadius: 8,
    backgroundColor: colors.primarySoft,
  },
  totalStatsLabel: {
    marginTop: 4,
    color: colors.primary,
    fontSize: 12,
    fontWeight: "800",
    textTransform: "uppercase",
  },
  totalStatsValue: {
    color: colors.primary,
    fontSize: 30,
    fontWeight: "900",
  },
  stateContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: 12,
    padding: 24,
    backgroundColor: colors.background,
  },
  stateText: {
    color: colors.textMuted,
    fontSize: 16,
  },
  title: {
    marginTop: 8,
    color: colors.text,
    fontSize: 34,
    fontWeight: "800",
  },
  typePill: {
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: 8,
    backgroundColor: "#F0F3F5",
  },
  typeRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    marginTop: 18,
  },
  typeText: {
    color: colors.text,
    fontSize: 13,
    fontWeight: "700",
  },
});

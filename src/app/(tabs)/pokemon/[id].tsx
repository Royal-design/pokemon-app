import { useLocalSearchParams } from "expo-router";
import { StyleSheet, Text, View } from "react-native";

import { colors } from "@/global";

export default function PokemonDetails() {
  const { id } = useLocalSearchParams<{ id: string }>();

  return (
    <View style={styles.container}>
      <Text style={styles.eyebrow}>Pokemon Details</Text>
      <Text style={styles.title}>{id}</Text>
      <Text style={styles.subtitle}>
        Details for this Pokemon will appear here.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 24,
    backgroundColor: colors.background,
  },
  eyebrow: {
    color: colors.primary,
    fontSize: 13,
    fontWeight: "700",
    textTransform: "uppercase",
  },
  subtitle: {
    marginTop: 10,
    color: colors.textMuted,
    fontSize: 16,
  },
  title: {
    marginTop: 8,
    color: colors.text,
    fontSize: 36,
    fontWeight: "700",
  },
});

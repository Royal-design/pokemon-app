import { Link } from "expo-router";
import { StyleSheet, Text, View } from "react-native";

import { colors } from "@/global";

export default function Pokemon() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Pokemon</Text>
      <Text style={styles.subtitle}>Your Pokemon list will live here.</Text>
      <Link
        href={{
          pathname: "/(tabs)/pokemon/[id]",
          params: { id: "25" },
        }}
        style={styles.link}
      >
        Open sample details
      </Link>
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
  link: {
    marginTop: 20,
    color: colors.primary,
    fontSize: 16,
    fontWeight: "600",
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

import { StyleSheet, Text, View } from "react-native";

import { colors } from "@/global";

export default function Favourites() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Favourites</Text>
      <Text style={styles.subtitle}>Your saved Pokemon will appear here.</Text>
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

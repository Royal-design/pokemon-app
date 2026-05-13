import { Stack } from "expo-router";

export default function PokemonLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          title: "Pokemon",
        }}
      />
      <Stack.Screen
        name="[id]"
        options={{
          title: "Pokemon Details",
        }}
      />
    </Stack>
  );
}

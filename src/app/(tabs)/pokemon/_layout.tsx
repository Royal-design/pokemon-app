import { Stack } from "expo-router";

import { stackHeaderTheme } from "@/global";

export default function PokemonLayout() {
  return (
    <Stack screenOptions={stackHeaderTheme}>
      <Stack.Screen
        name="index"
        options={{
          title: "Pokemon",
        }}
      />
      <Stack.Screen
        name="[id]"
        options={{
          presentation: "transparentModal",
          title: "Pokemon Details",
        }}
      />
    </Stack>
  );
}

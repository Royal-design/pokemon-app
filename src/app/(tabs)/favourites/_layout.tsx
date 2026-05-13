import { Stack } from "expo-router";

import { stackHeaderTheme } from "@/global";

export default function FavouritesLayout() {
  return (
    <Stack screenOptions={stackHeaderTheme}>
      <Stack.Screen
        name="index"
        options={{
          title: "Favourites",
        }}
      />
    </Stack>
  );
}

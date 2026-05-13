import { Stack } from "expo-router";

export default function FavouritesLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          title: "Favourites",
        }}
      />
    </Stack>
  );
}

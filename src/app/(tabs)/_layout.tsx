import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { NativeTabs } from "expo-router/unstable-native-tabs";

import { nativeTabsTheme } from "@/global";

export default function TabsLayout() {
  return (
    <NativeTabs
      backgroundColor={nativeTabsTheme.backgroundColor}
      blurEffect={nativeTabsTheme.blurEffect}
      iconColor={nativeTabsTheme.iconColor}
      labelStyle={{
        default: nativeTabsTheme.label,
        selected: nativeTabsTheme.selectedLabel,
      }}
      shadowColor={nativeTabsTheme.shadowColor}
      tintColor={nativeTabsTheme.tintColor}
    >
      <NativeTabs.Trigger name="pokemon">
        <NativeTabs.Trigger.Icon
          sf={{ default: "circle.grid.2x2", selected: "circle.grid.2x2.fill" }}
          src={
            <NativeTabs.Trigger.VectorIcon
              family={MaterialCommunityIcons}
              name="pokeball"
            />
          }
        />
        <NativeTabs.Trigger.Label selectedStyle={nativeTabsTheme.selectedLabel}>
          Pokemon
        </NativeTabs.Trigger.Label>
      </NativeTabs.Trigger>
      <NativeTabs.Trigger name="favourites">
        <NativeTabs.Trigger.Icon
          sf={{ default: "heart", selected: "heart.fill" }}
          src={
            <NativeTabs.Trigger.VectorIcon
              family={MaterialCommunityIcons}
              name="heart"
            />
          }
        />
        <NativeTabs.Trigger.Label selectedStyle={nativeTabsTheme.selectedLabel}>
          Favourites
        </NativeTabs.Trigger.Label>
      </NativeTabs.Trigger>
    </NativeTabs>
  );
}

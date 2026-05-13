export const colors = {
  background: "#F5F7F8",
  border: "#D8E0E5",
  primary: "#256D5A",
  primarySoft: "#E7F1EE",
  surface: "#FFFFFF",
  text: "#1F2930",
  textMuted: "#6E7881",
};

export const nativeTabsTheme = {
  backgroundColor: "rgba(255, 255, 255, 0.82)",
  blurEffect: "systemThinMaterial",
  iconColor: {
    default: colors.textMuted,
    selected: colors.primary,
  },
  indicatorColor: colors.primarySoft,
  label: {
    fontSize: 11,
    fontWeight: "700",
    color: colors.textMuted,
  },
  selectedLabel: {
    color: colors.primary,
  },
  shadowColor: "rgba(31, 41, 48, 0.12)",
  tintColor: colors.primary,
} as const;

export const stackHeaderTheme = {
  contentStyle: {
    backgroundColor: colors.background,
  },
  headerShadowVisible: false,
  headerStyle: {
    backgroundColor: colors.background,
  },
  headerTintColor: colors.text,
  headerTitleStyle: {
    color: colors.text,
    fontSize: 18,
    fontWeight: "700",
  },
} as const;

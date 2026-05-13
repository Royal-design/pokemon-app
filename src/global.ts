export const colors = {
  background: "#F6F7F9",
  border: "#DDE2E7",
  primary: "#2F6F5E",
  surface: "#FFFFFF",
  text: "#202428",
  textMuted: "#737B84",
};

export const nativeTabsTheme = {
  backgroundColor: "rgba(255, 255, 255, 0.72)",
  blurEffect: "systemUltraThinMaterial",
  iconColor: {
    default: colors.textMuted,
    selected: colors.primary,
  },
  label: {
    fontSize: 12,
    fontWeight: "600",
    color: colors.textMuted,
  },
  selectedLabel: {
    color: colors.primary,
  },
  shadowColor: "rgba(32, 36, 40, 0.14)",
  tintColor: colors.primary,
} as const;

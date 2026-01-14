import { StyleSheet } from "react-native";

export const settingsStyle = StyleSheet.create({
  settingsPageDesktop: {
    flex: 1,
    flexDirection: "column",
    gap: 10,
  },
  section: {
    flex: 1,
    flexDirection: "column",
    gap: 5,
  },
  sectionTitle: {},

  divider: {
    borderStyle: "solid",
    borderColor: "grey",
    borderTopWidth: 1,
  },
  preferenceRow: {},
  sourcesGrid: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
  },
  sourceCard: {},
  sourceIcon: {},
  sourceCardInteractions: {},
  switchBtn: {
    padding: 10,
  },
});

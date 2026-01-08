import { StyleSheet } from "react-native";
import {
  backgroundColor,
  backgroundContrastColor,
  primaryTextColor,
} from "./globalStyle";

export const navbarStyle = StyleSheet.create({
  navbarDesktop: {
    backgroundColor: backgroundColor,
    padding: 40,
    height: 60,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  navbarMobile: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  navIcon: {
    backgroundColor: "#3d3866",
    padding: 10,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: backgroundContrastColor,
    padding: 10,
    paddingLeft: 25,
    paddingRight: 25,
    borderRadius: 20,
  },
  searchText: {
    outlineWidth: 0,
    userSelect: "none",
    fontSize: 18,
    color: primaryTextColor,
  },
  interactivityContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 20,
    padding: 10,
  },
  btnIcon: {
    padding: 10,
    backgroundColor: backgroundContrastColor,
    borderRadius: 100,
  },
});

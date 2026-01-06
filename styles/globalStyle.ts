import { StyleSheet } from "react-native";

export const backgroundColor = "#191923";
export const primaryTextColor = "#ffffff";

export const globalStyle = StyleSheet.create({
  body: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  background: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: -1,
  },
  btn: {
    padding: 10,
    borderRadius: 20,
    color: "white",
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  btnIcon: {},
  icon: {},
});

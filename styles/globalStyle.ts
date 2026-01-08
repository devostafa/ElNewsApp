import { StyleSheet } from "react-native";

export const backgroundColor = "#0D1E41";
export const backgroundContrastColor = "#08142B";
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
  criticalBtn: {
    backgroundColor: "red",
    color: "white",
    padding: 10,
    borderRadius: 20,
  },
  btnIcon: {
    padding: 10,
    backgroundColor: backgroundColor,
    borderRadius: 100,
  },
  icon: {
    resizeMode: "contain",
    alignSelf: "center",
    justifyContent: "center",
    width: 40,
    height: 40,
  },
});

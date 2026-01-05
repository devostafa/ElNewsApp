import { StyleSheet } from "react-native";
import { primaryTextColor } from "./globalStyle";

const screenWidth = window.innerWidth;

export const newsStyleDesktop = StyleSheet.create({
  mainContainerDesktop: {
    display: "flex",
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
  },
  newsListContainer: {
    flex: 1,
    flexDirection: "column",
    height: "100%",
    width: 250,
    maxWidth: screenWidth * 0.3,
    alignItems: "center",
    justifyContent: "center",
    borderStyle: "solid",
    borderRightWidth: 2,
    borderRightColor: "rgba(255,255,255,0.2)",
  },
  newsList: {
    flex: 1,
    flexDirection: "column",
  },
  newsListInfo: {
    opacity: 0.5,
    fontSize: 24,
    color: primaryTextColor,
    fontWeight: "200",
    textAlign: "center",
    fontStyle: "italic",
  },
  newsCard: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    backgroundColor: "#3d4866",
    margin: 10,
    borderRadius: 20,
  },
  newsDetailContainer: {
    flex: 1,
    flexDirection: "column",
  },
  newsDetailTitle: {
    fontSize: 20,
  },
});

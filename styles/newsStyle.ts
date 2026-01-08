import { StyleSheet } from "react-native";
import { primaryTextColor } from "./globalStyle";

const screenWidth = window.innerWidth;

export const newsStyle = StyleSheet.create({
  newsPageDesktop: {
    display: "flex",
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  newsListContainer: {
    flex: 1,
    flexDirection: "column",
    height: "100%",
    maxWidth: 700,
    alignItems: "center",
    justifyContent: "center",
    borderStyle: "solid",
    borderRightWidth: 1,
    borderRightColor: "rgba(255,255,255,0.2)",
  },
  newsList: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  newsListEmpty: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  newsListInfo: {
    opacity: 0.5,
    fontSize: 24,
    color: primaryTextColor,
    fontWeight: "200",
    textAlign: "center",
    fontStyle: "italic",
  },
  addNewsInfo: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
  },
  addNewsInfoText: {
    fontSize: 24,
    color: primaryTextColor,
    fontWeight: "200",
    textAlign: "center",
    fontStyle: "italic",
  },
  newsCard: {
    display: "flex",
    flex: 1,
    flexDirection: "row",
    backgroundColor: "#3d4866",
    margin: 10,
    borderRadius: 20,
  },
  newsCardImage: {
    width: 100,
    maxHeight: 200,
    borderRadius: 20,
    marginRight: 10,
  },
  newsCardTextContainer: {
    flex: 1,
    paddingRight: 10,
    paddingTop: 10,
    paddingBottom: 10,
  },
  newsCardSource: {
    color: "white",
    fontSize: 12,
    margin: 2,
  },
  newsCardPublished: {
    color: "#585865",
    fontSize: 10,
    margin: 2,
  },
  newsCardTitle: {
    color: "white",
    fontSize: 18,
    fontWeight: "900",
    margin: 2,
  },

  newsDetailContainer: {
    flex: 1,
    flexDirection: "column",
  },
  newsDetailHeader: {
    padding: 20,
  },
  newsDetailHeaderPublished: {
    color: "#585865",
    fontSize: 12,
  },
  newsDetailHeaderSource: {
    color: "white",
    fontSize: 14,
  },
  newsDetailHeaderText: {
    color: "white",
    fontSize: 24,
    fontWeight: "900",
  },
  newsDetailBody: {
    padding: 20,
  },
  newsDetailBodyText: {
    color: "white",
    fontSize: 16,
    lineHeight: 24,
  },
  newsDetailImage: {
    width: "100%",
    height: 300,
    borderRadius: 20,
    marginBottom: 20,
  },
  newsDetailTitle: {
    fontSize: 20,
  },
});

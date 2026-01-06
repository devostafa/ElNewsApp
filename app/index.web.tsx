import {
  Animated,
  Linking,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useContext, useRef, useState } from "react";
import { Image } from "expo-image";
import { Article } from "../services/database/models/Article";
import { getNews } from "../services/news/news";
import { newsStyleDesktop } from "../styles/newsStyleDesktop";
import { MainContext } from "../services/state/context/mainContext";
import { globalStyle } from "../styles/globalStyle";

export default function Index({ navigation }: any) {
  const [news, setNews] = useState<Article[]>([]);
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const [currentNewsToDisplay, setCurrentNewsToDisplay] = useState<Article>();
  const { selectedPage, setSelectedPage } = useContext(MainContext);

  const fetchNews = async () => {
    let allnews = await getNews();
    setNews(allnews);
  };

  const directToURL = (url: string) => {
    Linking.openURL(url);
  };

  const navigateToMenuPage = () => {
    setSelectedPage(0);
    navigation.navigate("Menu");
  };

  return (
    <View style={newsStyleDesktop.mainContainerDesktop}>
      {/*News Scroll List*/}
      <View style={newsStyleDesktop.newsListContainer}>
        {news?.length == 0 && (
          <View
            style={{ flex: 1, flexDirection: "column", alignItems: "center" }}
          >
            <Text style={newsStyleDesktop.newsListInfo}>
              No news to show...
            </Text>
            <View>
              <Text>Try adding news sources in settings</Text>
              <TouchableOpacity onPress={navigateToMenuPage}>
                <Image
                  style={globalStyle.icon}
                  source={require("../../assets/SettingsIcon.svg")}
                />
              </TouchableOpacity>
            </View>
          </View>
        )}
        {news?.length > 0 && (
          <ScrollView style={newsStyleDesktop.newsList}>
            {news?.map((rss: Article) => (
              <View style={{ backgroundColor: "Red" }}>
                <Animated.View
                  style={{
                    flex: 1,
                    flexDirection: "row",
                    backgroundColor: "#3d4866",
                    margin: 10,
                    borderRadius: 20,
                    opacity: fadeAnim,
                  }}
                >
                  <TouchableOpacity
                    key={rss.title}
                    style={{ flexDirection: "row", flex: 1 }}
                    onPress={() => directToURL(rss.url)}
                  >
                    <Image
                      source={{ uri: rss.imageUrl }}
                      style={{
                        width: 100,
                        maxHeight: 200,
                        borderRadius: 20,
                        marginRight: 10,
                      }}
                    />
                    <View
                      style={{
                        flex: 1,
                        paddingRight: 10,
                        paddingTop: 10,
                        paddingBottom: 10,
                      }}
                    >
                      <Text style={{ color: "white", fontSize: 12, margin: 2 }}>
                        {rss.source}
                      </Text>
                      <Text
                        style={{ color: "#585865", fontSize: 10, margin: 2 }}
                      >
                        {rss.published}
                      </Text>
                      <Text
                        style={{
                          color: "white",
                          fontSize: 18,
                          fontWeight: "900",
                          margin: 2,
                        }}
                      >
                        {rss.title}
                      </Text>
                    </View>
                  </TouchableOpacity>
                </Animated.View>
              </View>
            ))}
          </ScrollView>
        )}
      </View>

      {/*News Detail*/}
      <View style={newsStyleDesktop.newsDetailContainer}>
        <View style={newsStyleDesktop.newsDetailHeader}>
          <View>
            <Text style={newsStyleDesktop.newsDetailHeaderPublished}>
              {currentNewsToDisplay?.published}
            </Text>
            <Text style={newsStyleDesktop.Seperator}>-</Text>
            <Text style={newsStyleDesktop.newsDetailHeaderSource}>
              {currentNewsToDisplay?.source}
            </Text>
          </View>
          <Text style={newsStyleDesktop.newsDetailHeaderText}>
            {currentNewsToDisplay?.title}
          </Text>
        </View>
        <View style={newsStyleDesktop.newsDetailBody}>
          <Image
            source={{ uri: currentNewsToDisplay?.imageUrl }}
            style={newsStyleDesktop.newsDetailImage}
          ></Image>
          <Text>{currentNewsToDisplay?.body}</Text>
        </View>
      </View>
    </View>
  );
}

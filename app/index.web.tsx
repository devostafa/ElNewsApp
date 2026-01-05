import {
  Animated,
  Linking,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useRef, useState } from "react";
import { Image } from "expo-image";
import { RSS } from "../services/database/models/RSS";
import { newsService } from "../services/newsService/news";
import { newsStyleDesktop } from "../styles/newsStyleDesktop";

export default function Home() {
  const [news, setNews] = useState<RSS[]>([]);
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const [currentNewsToDisplay, setCurrentNewsToDisplay] = useState<RSS>();

  const getNews = async () => {
    let allnews = await newsService.GetRSS();
    setNews(allnews);
  };

  const directToURL = (url: string) => {
    Linking.openURL(url);
  };

  return (
    <View style={newsStyleDesktop.mainContainerDesktop}>
      {/*News Scroll List*/}
      <View style={newsStyleDesktop.newsListContainer}>
        {news?.length == 0 && (
          <Text style={newsStyleDesktop.newsListInfo}>No news to show...</Text>
        )}
        {news?.length > 0 && (
          <ScrollView style={newsStyleDesktop.newsList}>
            {news?.map((rss: RSS) => (
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
          <Text>{currentNewsToDisplay?.description}</Text>
        </View>
      </View>
    </View>
  );
}

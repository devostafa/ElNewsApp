import {
  Linking,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Animated, { useSharedValue, withTiming } from "react-native-reanimated";
import React, { useContext, useEffect, useState } from "react";
import { Image } from "expo-image";
import { Article } from "../services/database/models/Article";
import { newsStyle } from "../styles/newsStyle";
import { MainContext } from "../services/state/context/mainContext";
import { globalStyle } from "../styles/globalStyle";
import { fetchNews } from "../services/news/news";

export default function Index({ navigation }: any) {
  const [articles, setArticles] = useState<Article[]>([]);
  const [selectedArticleIndex, setSelectedArticleIndex] = useState<
    number | null
  >(null);
  const { setSelectedPage } = useContext(MainContext);

  const fadeOpacity = useSharedValue(0);

  const getNews = async () => {
    const allArticles = await fetchNews();
    setArticles(allArticles);
  };

  const directToURL = (url: string) => {
    Linking.openURL(url);
  };

  const navigateToMenuPage = () => {
    setSelectedPage(0);
    navigation.navigate("Settings");
  };

  const selectArticle = (index: number) => {
    setSelectedArticleIndex(index);
    fadeOpacity.value = withTiming(1, { duration: 500 });
  };

  const deselctArticle = () => {
    fadeOpacity.value = withTiming(0, { duration: 200 });
    setSelectedArticleIndex(undefined);
  };

  useEffect(() => {
    getNews();
  }, []);

  return (
    <View style={newsStyle.newsPageDesktop}>
      {/*News Scroll List*/}
      <View style={newsStyle.newsListContainer}>
        {articles?.length == 0 && (
          <View style={newsStyle.newsListEmpty}>
            <Text style={newsStyle.newsListInfo}>No news to show...</Text>
            <View style={newsStyle.addNewsInfo}>
              <Text style={newsStyle.addNewsInfoText}>
                Try adding news sources in settings
              </Text>
              <TouchableOpacity
                style={globalStyle.btnIcon}
                onPress={navigateToMenuPage}
              >
                <Image
                  style={globalStyle.icon}
                  source={require("../assets/SettingsIcon.svg")}
                />
              </TouchableOpacity>
            </View>
          </View>
        )}
        {articles?.length > 0 && (
          <ScrollView style={newsStyle.newsList}>
            {articles?.map((article: Article, index) => (
              <TouchableOpacity
                onPress={() => selectArticle(index)}
                key={index}
              >
                <View>
                  <Animated.View
                    style={[newsStyle.newsCard, { opacity: fadeOpacity }]}
                  >
                    <TouchableOpacity
                      key={article.title}
                      style={{ flexDirection: "row", flex: 1 }}
                      onPress={() => directToURL(article.url)}
                    >
                      <Image
                        source={{ uri: article.imageUrl }}
                        style={newsStyle.newsCardImage}
                      />
                      <View style={newsStyle.newsCardTextContainer}>
                        <Text style={newsStyle.newsCardSource}>
                          {article.source}
                        </Text>
                        <Text style={newsStyle.newsCardPublished}>
                          {article.published}
                        </Text>
                        <Text style={newsStyle.newsCardTitle}>
                          {article.title}
                        </Text>
                      </View>
                    </TouchableOpacity>
                  </Animated.View>
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>
        )}
      </View>

      {/*Article Details*/}
      {selectedArticleIndex != null && (
        <Animated.View
          style={[newsStyle.newsDetailContainer, { opacity: fadeOpacity }]}
        >
          <View style={newsStyle.newsDetailHeader}>
            <View>
              <Text style={newsStyle.newsDetailHeaderPublished}>
                {articles[selectedArticleIndex].published}
              </Text>
              <Text style={newsStyle.newsDetailHeaderSource}>
                {articles[selectedArticleIndex]?.source}
              </Text>
            </View>
            <Text style={newsStyle.newsDetailHeaderText}>
              {articles[selectedArticleIndex]?.title}
            </Text>
          </View>
          <View style={newsStyle.newsDetailBody}>
            <Image
              style={newsStyle.newsDetailImage}
              source={{ uri: articles[selectedArticleIndex]?.imageUrl }}
            />
            <Text style={newsStyle.newsDetailBodyText}>
              {articles[selectedArticleIndex]?.body}
            </Text>
          </View>
        </Animated.View>
      )}
    </View>
  );
}

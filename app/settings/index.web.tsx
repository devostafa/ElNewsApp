import { Text, TouchableOpacity, View } from "react-native";
import { useEffect, useState } from "react";
import { Source } from "../../services/database/models/Source";
import {
  deleteAllSources,
  deleteSourceFromDatabase,
  getSources,
} from "../../services/news/news";
import { settingsStyle } from "../../styles/settingsStyle";
import { Image } from "expo-image";
import { globalStyle } from "../../styles/globalStyle";
import { useRouter } from "expo-router";

export const Settings = () => {
  const [sources, setSources] = useState<Source[]>([]);
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const router = useRouter();

  const openModal = () => {
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    fetchSources();
  };

  const fetchSources = async () => {
    const queriedSources = await getSources();
    setSources(queriedSources);
  };

  const clearSources = async () => {
    await deleteAllSources();
    fetchSources();
  };

  const deleteSource = async (index: number) => {
    await deleteSourceFromDatabase(index);
    fetchSources();
  };

  const editSource = (index: number) => {};

  const navigateBack = () => {
    router.navigate("/");
  };

  useEffect(() => {
    fetchSources();
  }, []);

  return (
    <View style={settingsStyle.settingsPageDesktop}>
      <View style={settingsStyle.section}>
        <Text>Options</Text>
        <View>
          <View>
            <Text></Text>
            <TouchableOpacity
              style={globalStyle.criticalBtn}
              onPress={() => clearSources()}
            ></TouchableOpacity>
          </View>
        </View>
      </View>

      <View style={settingsStyle.section}>
        <Text>News Sources</Text>
        <View>
          <View style={settingsStyle.sourcesGrid}>
            {sources.map((source: Source) => (
              <View style={settingsStyle.sourceContainer}>
                <Image style={settingsStyle.sourceIcon} source={source.url} />
                <Text style={settingsStyle.sourceName}>{source.name}</Text>
                <TouchableOpacity
                  style={globalStyle.criticalBtn}
                  onPress={() => deleteSource(source.id)}
                >
                  <Text style={{ color: "red", fontWeight: "bold" }}>X</Text>
                </TouchableOpacity>
              </View>
            ))}
            <TouchableOpacity
              style={globalStyle.btnIcon}
              onPress={() => openModal()}
            >
              <Image
                style={globalStyle.icon}
                source={require("../../assets/AddIcon.svg")}
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

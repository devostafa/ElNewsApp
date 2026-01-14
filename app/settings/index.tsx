import {
  FlatList,
  ListRenderItemInfo,
  ScrollView,
  Switch,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useEffect, useState } from "react";
import { Source } from "../../services/database/models/Source";
import {
  deleteAllSources,
  deleteSourceFromDatabase,
  fetchSourceIconUrl,
  fetchSources,
} from "../../services/news/news";
import { useRouter } from "expo-router";
import { settingsStyle } from "../../styles/settingsStyle";
import { globalStyle } from "../../styles/globalStyle";
import { Image } from "expo-image";
import { toggleConfigOption } from "../../services/config/config";
import { AddModal } from "../../components/addSourceModal/AddModal";

export const Settings = () => {
  const [sources, setSources] = useState<Source[]>([]);
  const [addModalVisible, setAddModalVisible] = useState<boolean>(false);
  const router = useRouter();

  const getSources = async () => {
    const data = await fetchSources();
    setSources(data);
  };

  const openAddModal = () => {
    setAddModalVisible(true);
  };

  const closeModal = () => {
    setAddModalVisible(false);
    getSources();
  };

  const clearSources = async () => {
    await deleteAllSources();
    getSources();
  };

  const deleteSource = async (sourceIndex: number) => {
    await deleteSourceFromDatabase(sourceIndex);
    getSources();
  };

  const editSource = (sourceIndex: number) => {};

  const navigateToNews = () => {
    router.navigate("/");
  };

  useEffect(() => {
    getSources();
  }, []);

  const sourceCard = (item: ListRenderItemInfo<Source>) => {
    const [sourceIconUrl, setSourceIconUrl] = useState<string>("");

    const source = item.item;

    useEffect(() => {
      const getSourceIconUrl = async () => {
        const iconUrl = await fetchSourceIconUrl(source.url);
        setSourceIconUrl(iconUrl);
      };

      getSourceIconUrl();
    }, []);

    return (
      <View style={settingsStyle.sourceCard}>
        <Image style={settingsStyle.sourceIcon} source={sourceIconUrl}></Image>
        <Text style={globalStyle.titleText}>{source.name}</Text>
        <View style={settingsStyle.sourceCardInteractions}>
          <TouchableOpacity onPress={() => editSource(source.id)}>
            <Image source={require("../../assets/EditIcon.svg")}></Image>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => deleteSource(source.id)}>
            <Image source={require("../../assets/DeleteIcon.svg")} />
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <ScrollView style={globalStyle.pageMobile}>
      {addModalVisible && (
        <AddModal visible={addModalVisible} CloseWindow={closeModal} />
      )}

      <View style={settingsStyle.section}>
        <Text style={settingsStyle.sectionTitle}>Preferences</Text>
        <View style={settingsStyle.divider}></View>
        <View style={settingsStyle.preferenceRow}>
          <Text>Test</Text>
          <Switch
            style={settingsStyle.switchBtn}
            onValueChange={(value) => toggleConfigOption(0, value)}
          />
        </View>
      </View>
      <View style={settingsStyle.section}>
        <Text style={settingsStyle.sectionTitle}>News Sources</Text>
        <View style={settingsStyle.divider}></View>
        <View>
          <TouchableOpacity
            style={globalStyle.criticalBtn}
            onPress={() => clearSources()}
          >
            <Text style={globalStyle.text}>Clear</Text>
          </TouchableOpacity>
        </View>
        <FlatList
          style={settingsStyle.sourcesGrid}
          data={sources}
          renderItem={(item) => sourceCard(item)}
          keyExtractor={(source) => source.id.toString()}
          ListFooterComponent={
            <TouchableOpacity onPress={() => openAddModal()}>
              <Image
                style={globalStyle.icon}
                source={require("../../../assets/AddIcon.svg")}
              />
            </TouchableOpacity>
          }
        />
      </View>
    </ScrollView>
  );
};

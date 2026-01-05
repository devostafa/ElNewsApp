import {
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useContext } from "react";
import { MainContext } from "../../services/state/context/mainContext";
import { globalStyle, primaryTextColor } from "../../styles/globalStyle";
import { SearchContext } from "../../services/state/context/searchContext";
import { Image } from "expo-image";

export function Navbar({ navigation }: any) {
  const { selectedPage, setSelectedPage } = useContext(MainContext);
  const { search, setSearch } = useContext(SearchContext);

  const navigateToMenuPage = () => {
    setSelectedPage(0);
    navigation.navigate("Menu");
  };

  const navigateToNewsPage = () => {
    setSelectedPage(1);
    navigation.navigate("Index");
  };

  const navigateMenu = () => {
    if (selectedPage === 0) {
      navigateToMenuPage();
    } else if (selectedPage == 1) {
      navigateToNewsPage();
    }
  };

  if (Platform.OS == "web") {
    return (
      <View style={navbarStyle.navbarDesktop}>
        <View style={navbarStyle.searchContainer}>
          <TextInput
            style={navbarStyle.searchText}
            placeholder="Search News... "
            onChangeText={(event) => setSearch(event)}
          />
          <Image source={require("../../assets/SearchIcon.svg")} />
        </View>
        <View style={navbarStyle.interactivityContainer}>
          <TouchableOpacity style={globalStyle.btn}>
            <Image source={require("../../assets/RefreshIcon.svg")} />
          </TouchableOpacity>
          <TouchableOpacity onPress={navigateMenu} style={globalStyle.btn}>
            {selectedPage === 0 && (
              <Image source={require("../../assets/SettingsIcon.svg")} />
            )}
            {selectedPage === 1 && (
              <Image source={require("../../assets/NewsIcon.svg")} />
            )}
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  return (
    <View style={navbarStyle.navbarMobile}>
      <Text>ElNews App</Text>
      <TouchableOpacity onPress={navigateMenu} style={globalStyle.btn}>
        {selectedPage === 0 && (
          <Image source={require("../../assets/SettingsIcon.svg")} />
        )}
        {selectedPage === 1 && (
          <Image source={require("../../assets/NewsIcon.svg")} />
        )}
      </TouchableOpacity>
      <TouchableOpacity style={globalStyle.btn}>
        <Text style={{ color: "red", fontSize: 20 }}>X</Text>
      </TouchableOpacity>
    </View>
  );
}

const navbarStyle = StyleSheet.create({
  navbarDesktop: {
    backgroundColor: "#3d4866",
    padding: 20,
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
    backgroundColor: "#332f57",
    padding: 10,
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
    backgroundColor: "#3d3866",
    padding: 10,
  },
});

import {
  Platform,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useContext } from "react";
import { MainContext } from "../../services/state/context/mainContext";
import { globalStyle } from "../../styles/globalStyle";
import { SearchContext } from "../../services/state/context/searchContext";
import { Image } from "expo-image";
import { navbarStyle } from "../../styles/navbarStyle";

export function Navbar({ navigation }: any) {
  const { selectedPage, setSelectedPage } = useContext(MainContext);
  const { search, setSearch } = useContext(SearchContext);

  const navigateToMenuPage = () => {
    setSelectedPage(0);
    navigation.navigate("Settings");
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
          <TouchableOpacity style={navbarStyle.btnIcon}>
            <Image
              style={globalStyle.icon}
              source={require("../../assets/RefreshIcon.svg")}
            />
          </TouchableOpacity>
          <TouchableOpacity style={navbarStyle.btnIcon} onPress={navigateMenu}>
            {selectedPage === 0 && (
              <Image
                style={globalStyle.icon}
                source={require("../../assets/SettingsIcon.svg")}
              />
            )}
            {selectedPage === 1 && (
              <Image
                style={globalStyle.icon}
                source={require("../../assets/NewsIcon.svg")}
              />
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

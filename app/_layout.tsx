import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import { Navbar } from "../components/navbar/navbar";
import { globalStyle } from "../styles/globalStyle";
import { SearchContextProvider } from "../services/state/context/searchContext";
import { MainContextProvider } from "../services/state/context/mainContext";
import { initDb } from "../services/database/dbContext";
import { Image } from "expo-image";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const loaded = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  // All startup functions run here
  useEffect(() => {
    initDb();

    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, []);

  if (!loaded) {
    return null;
  }

  return (
    <>
      <Image
        source={require("../assets/background.jpg")}
        style={globalStyle.background}
      />

      <MainContextProvider>
        <SearchContextProvider>
          <Navbar />
          <Stack
            screenOptions={{
              headerShown: false,
              presentation: "transparentModal",
              contentStyle: globalStyle.body,
            }}
          />
        </SearchContextProvider>
      </MainContextProvider>
    </>
  );
}

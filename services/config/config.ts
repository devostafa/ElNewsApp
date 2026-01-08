import { createAsyncStorage } from "@react-native-async-storage/async-storage";

const config = createAsyncStorage("Config");

export async function InitConfig() {
  const theme = await config.getItem("theme");
  const language = await config.getItem("language");

  if (theme === null && language === null) {
    await Promise.all([
      config.setItem("theme", "0"),
      config.setItem("language", "en"),
    ]);
  }
}

export default config;

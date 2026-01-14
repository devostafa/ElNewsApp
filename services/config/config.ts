import { createAsyncStorage } from "@react-native-async-storage/async-storage";

const config = createAsyncStorage("Config");

export const InitConfig = async () => {
  const theme = await config.getItem("theme");
  const language = await config.getItem("language");

  if (theme === null && language === null) {
    await Promise.all([
      config.setItem("theme", "0"),
      config.setItem("language", "en"),
    ]);
  }
};

export const toggleConfigOption = async (index: number, value: boolean) => {
  const options = ["theme", "language"];
  const key = options[index];
  if (key) {
    await config.setItem(key, value ? "1" : "0");
  }
};

export default config;

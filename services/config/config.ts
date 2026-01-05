import {
  AsyncStorage,
  createAsyncStorage,
} from "@react-native-async-storage/async-storage";

let config: AsyncStorage;

export async function InitConfig() {
  const [check1, check2] = await Promise.all([
    config.getItem("theme"),
    config.getItem("language"),
  ]);

  if (check1 && check2) {
    return;
  } else {
    config = createAsyncStorage("Config");
    await config.setItem("theme", "0");
    await config.setItem("language", "en");
  }
}

export default config;

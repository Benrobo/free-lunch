import * as SecureStore from "expo-secure-store";

export default class LocalStorage {
  async setItem(key, value) {
    try {
      await SecureStore.setItemAsync(key, JSON.stringify(value));
    } catch (e) {
      console.log(`Error saving ${key} data`, e);
    }
  }

  async getItem(key) {
    try {
      const value = await SecureStore.getItemAsync(key);
      return value === null || typeof value === "undefined"
        ? null
        : JSON.parse(value);
    } catch (e) {
      console.log(`Error retrieving ${key} item`, e);
    }
  }

  async removeItem(key) {
    try {
      await SecureStore.deleteItemAsync(key);
    } catch (e) {
      console.log(`Error removing ${key} item`, e);
    }
  }
}

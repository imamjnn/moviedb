import Storage from 'react-native-storage';
import AsyncStorage from '@react-native-community/async-storage';

const storage = new Storage({
  // maximum capacity, default 1000
  size: 9000,

  // Use AsyncStorage for RN apps, or window.localStorage for web apps.
  // If storageBackend is not set, data will be lost after reload.
  storageBackend: AsyncStorage, // for web: window.localStorage

  // expire time, default: 1 day (1000 * 3600 * 24 milliseconds).
  // can be null, which means never expire.
  defaultExpires: null,

  // cache data in the memory. default is true.
  enableCache: true,

  // if data was not found in storage or expired data was found,
  // the corresponding sync method will be invoked returning
  // the latest data.
  sync: {
    // we'll talk about the details later.
  }
});

export const save = async (key, data) => {
  try {
    let response = await storage.save({key: key, data: data})
    return response
  } catch(err) {
    return err
  }
}

export const saveById = async (key, id, data) => {
  try {
    let response = await storage.save({key: key, id: id, data: data})
    return response
  } catch(err) {
    return err
  }
}

export const load = async (key) => {
  try {
    let response = await storage.load({key: key})
    return response
  } catch(err) {
    return err.name
  }
}

export const loadAll = async (key) => {
  try {
    let response = await storage.getAllDataForKey(key)
    return response
  } catch(err) {
    return err.name
  }
}

export const loadById = async (key, id) => {
  try {
    let response = await storage.load({key: key, id: id})
    return response
  } catch(err) {
    return err.name
  }
}

export const remove = async (key) => {
  try {
    let response = await storage.remove({key: key})
    return response
  } catch(err) {
    return err.name
  }
}

export const removeById = async (key, id) => {
  try {
    let response = await storage.remove({key: key, id: id})
    return response
  } catch(err) {
    return err.name
  }
}

export const clearAllKey = async () => {
  try {
    let response = await storage.clearMap()
    return response
  } catch(err) {
    return err.name
  }
}

export const clearAllMap = async (key) => {
  try {
    let response = await storage.clearMapForKey(key);
    return response
  } catch(err) {
    return err.name
  }
}

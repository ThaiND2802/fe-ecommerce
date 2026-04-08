import { encryptData, decryptData, encryptKey } from './encryption';

export const setEncryptedItem = (key, value) => {
  const encryptedKey = encryptKey(key);

  const encryptedValue = encryptData(JSON.stringify(value));
  if (encryptedValue) {
    localStorage.setItem(encryptedKey, encryptedValue);
  }
};

export const getEncryptedItem = (key) => {
  const encryptedKey = encryptKey(key);

  const encryptedValue = localStorage.getItem(encryptedKey);
  if (encryptedValue) {
    return JSON.parse(decryptData(encryptedValue));
  }
  return null;
};

export const removeEncryptedItem = (key) => {
  const encryptedKey = encryptKey(key);
  if (encryptedKey) {
    localStorage.removeItem(encryptedKey);
  }
};

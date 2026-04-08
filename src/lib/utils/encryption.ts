import CryptoJS from 'crypto-js'

import { SECRET_KEY, IV_KEY } from 'src/environments/environment'

const SECRET_KEY_FORMAT = CryptoJS.enc.Utf8.parse(SECRET_KEY) // 16, 24, or 32 characters long
const IV = CryptoJS.enc.Utf8.parse(IV_KEY)

export const encryptData = (data) => {
  try {
    const ciphertext = CryptoJS.AES.encrypt(JSON.stringify(data), SECRET_KEY).toString()
    return ciphertext
  } catch (e) {
    console.error('Error encrypting data:', e)
    return null
  }
}

export const decryptData = (ciphertext) => {
  try {
    const bytes = CryptoJS.AES.decrypt(ciphertext, SECRET_KEY)
    const decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8))
    return decryptedData
  } catch (e) {
    console.error('Error decrypting data:', e)
    return null
  }
}

export const encryptKey = (data) => {
  try {
    const ciphertext = CryptoJS.AES.encrypt(JSON.stringify(data), SECRET_KEY_FORMAT, {
      iv: IV,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7,
    }).toString()
    return ciphertext
  } catch (e) {
    console.error('Error encrypting data:', e)
    return null
  }
}

export const decryptKey = (ciphertext) => {
  try {
    const bytes = CryptoJS.AES.decrypt(ciphertext, SECRET_KEY_FORMAT, {
      iv: IV,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7,
    })
    const decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8))
    return decryptedData
  } catch (e) {
    console.error('Error decrypting data:', e)
    return null
  }
}

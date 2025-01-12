

import CryptoJS from "crypto-js"
import { CRYPTO_SECREY_KEY } from "@/app/app.config";

export function encrypt(data:any,options?:{abc?:boolean}){
  const ciphertext = CryptoJS.AES.encrypt(JSON.stringify(data), CRYPTO_SECREY_KEY)
  if(options?.abc) return ciphertext.ciphertext.toString()
  return ciphertext.toString();
}
export function decrypt(ciphertext:string){
  const bytes = CryptoJS.AES.decrypt(ciphertext, CRYPTO_SECREY_KEY).toString(CryptoJS.enc.Utf8);
  return JSON.parse(bytes)
}
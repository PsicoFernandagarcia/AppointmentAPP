import * as CryptoJS from 'crypto-js';
import { environment } from 'src/environments/environment';

export class Encrypt{
    public static encrypt(value:string) {
        var keySize = 256;
        var salt = CryptoJS.lib.WordArray.random(16);
        var key = CryptoJS.PBKDF2(environment.secretKey, salt, {
          keySize: keySize / 32,
          iterations: 100
        });
        var iv = CryptoJS.lib.WordArray.random(128 / 8);
        var encrypted = CryptoJS.AES.encrypt(value, key, {
          iv: iv,
          padding: CryptoJS.pad.Pkcs7,
          mode: CryptoJS.mode.CBC
        });
        var result = CryptoJS.enc.Base64.stringify(salt.concat(iv).concat(encrypted.ciphertext));
        return result;
      }
}
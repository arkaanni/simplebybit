import { api_secret } from './config.js'
import hmacSHA256 from 'crypto-js/hmac-sha256'
import hex from 'crypto-js/enc-hex'

const generateSignature = (params) => {
  const hmac = hmacSHA256(params, api_secret)
  return hex.stringify(hmac)
}

const generateWebsocketSignature = (expires) => {
  const sign = generateSignature('GET/realtime' + expires)
  return sign
}

export {
  generateSignature, generateWebsocketSignature
}

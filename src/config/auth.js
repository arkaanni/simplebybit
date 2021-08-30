import { api_key, api_secret } from './config.js'
import hmacSHA256 from 'crypto-js/hmac-sha256'
import hex from 'crypto-js/enc-hex'

const expires = (Date.now() + 1000 * 36000)
const signature = hex.stringify(hmacSHA256('GET/realtime' + expires, api_secret))

const generateSignature = (params) => {
  const hmac = hmacSHA256(params, api_secret)
  return hex.stringify(hmac)
}

const auth = (wss) => {

  const authStr = JSON.stringify({
    'op': 'auth',
    'args': [api_key, expires, signature]
  })
  wss.send(authStr)
}

export {
  auth, generateSignature
}

// export const authStr = `api_key=${api_key}&expires=${expires}&signature=${signature}`

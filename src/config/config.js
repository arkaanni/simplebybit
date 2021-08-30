const mainnet_inverse_ws = "wss://stream.bytick.com/realtime"
const mainnet_usdt_ws = "wss://stream.bytick.com/realtime_public"
const mainnet_usdt_private_ws = "wss://stream.bytick.com/realtime_private"
const mainnet_restapi = "https://api.bytick.com"
const api_key = import.meta.env.VITE_API_KEY
const api_secret = import.meta.env.VITE_API_SECRET

export {
  mainnet_restapi, mainnet_inverse_ws, mainnet_usdt_ws, mainnet_usdt_private_ws, api_key, api_secret
}
import { generateWebsocketSignature } from "../config/auth"
import { api_key } from "../config/config"

const websocketRequest = (op: string, topic: string[], ws: WebSocket) => {
  const msg = JSON.stringify({
    "op": op,
    "args": topic
  })
  ws.send(msg)
}

const auth = (ws: WebSocket) => {
  const expires = (Date.now() + 1000 * 36000)
  const sign = generateWebsocketSignature(expires)
  websocketRequest("auth", [api_key.toString(), expires.toString(), sign], ws)
}

export {
  websocketRequest, auth
}
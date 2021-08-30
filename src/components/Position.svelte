<script>
  import { mainnet_usdt_endpoint } from '../config/config.js'
  import { auth } from '../config/auth.js'
  import WebSocket from 'ws'

  let position = ''
  const ws = new WebSocket(mainnet_usdt_endpoint)
  ws.onopen = (event) => {
    auth(ws)
    ws.send(JSON.stringify({"op": "subscribe", "args": ["position"]}))
  }
  ws.onmessage = (event) => {
    try {
      const data = JSON.parse(event.data)
      if (data.topic === "position") {
        console.log(data.data)
      }
    } catch (e) {
      console.log(e)
    }
  }
</script>

<div>{position}</div>

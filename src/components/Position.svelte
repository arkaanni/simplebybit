<script>
  import { mainnet_usdt_endpoint } from '../config/config.js'
  import { auth } from '../config/auth.js'
  import { onMount } from 'svelte';
  let position = ''
  onMount(() => { 
    const ws = new WebSocket(mainnet_usdt_endpoint)
    ws.onopen = (event) => {
      auth(ws)
      ws.send(JSON.stringify({"op": "subscribe", "args": ["position"]}))
    }
    ws.onmessage = (event) => {
      try {
        const res = JSON.parse(event.data)
        if (res.topic === "position") {
          console.log(res.data)
        }
      } catch (e) {
        console.log(e)
      }
    }
  })

</script>

<div>{position}</div>

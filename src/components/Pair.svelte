<script>
  import { mainnet_inverse_ws, mainnet_usdt_ws } from '../config/config.js'
  import { onMount } from 'svelte'
  import { usdtMode, selectedMarket } from '../config/store.js';
  import { websocketRequest } from "../network/websocket"

  let price = 0
  let mark_price = 0
  let wss = null
  let prevTopic = ""
  let defaultSymbol = ""

  onMount(() => {
    usdtMode.subscribe(mode => {
      try {
        wss.close()
      } catch (e) {}
      if (mode) {
        wss = new WebSocket(mainnet_usdt_ws)
        defaultSymbol = "BTCUSDT"
      } else {
        wss = new WebSocket(mainnet_inverse_ws)
        defaultSymbol = "BTCUSD"
      }
    })
  })

  $: if (wss !== null) {
    wss.onopen = () => {
      selectedMarket.set(defaultSymbol)
      selectedMarket.subscribe(symbol => {
        websocketRequest("unsubscribe", prevTopic, wss)
        price = "..."
        mark_price = "..."
        const topic = [`instrument_info.100ms.${symbol}`]
        prevTopic = topic
        websocketRequest("subscribe", topic, wss)
      })
    }
    wss.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data)
        if (data.type === "snapshot" ) {
          price = data.data.last_price
          mark_price = data.data.mark_price
        }
        if (!(data.data.update[0].last_price === undefined)) {
          price = data.data.update[0].last_price
        }
        if (!(data.data.update[0].mark_price === undefined)) {
          mark_price = data.data.update[0].mark_price
        }
      } catch (e) {}
    }
  }
</script>

<div>
  <div class="container">
    <div>
      <p class="ticker">{$selectedMarket}</p>
      <p>{price}</p>
    </div>
    <div>
      <p class="price-type">Mark Price</p>
      <p>{mark_price}</p>
    </div>
  </div>
</div>

<style>
  div {
    font-family: 'Helvetica';
    font-weight: bold;
  }

  .container {
    /* justify-content: center; */
    display: flex;
    gap: 16px;
  }

  .price-type {
    font-weight: normal;
  }
</style>

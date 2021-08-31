<script>
  import { mainnet_inverse_ws, mainnet_usdt_ws } from '../config/config.js'
  import { onMount } from 'svelte'
  import { usdtMode, selectedMarket } from '../config/store.js';
  import { subscribeTopic, unsubscribeTopic } from "../network/websocket"

  let price = 0
  let mark_price = 0
  let wss = null
  let prevTopic = ''

  $: if (wss !== null) {
    wss.onopen = (event) => {
      selectedMarket.subscribe(symbol => {
        unsubscribeTopic(prevTopic, wss)
        price = "..."
        mark_price = "..."
        const topic = [`instrument_info.100ms.${symbol}`]
        prevTopic = topic
        subscribeTopic(topic, wss)
      })
    }
    
    wss.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data)
        if (!(data.data.update[0].last_price_e4 === undefined)) {
          price = data.data.update[0].last_price_e4 / 10000
        }
        if (!(data.data.update[0].mark_price_e4 === undefined)) {
          mark_price = data.data.update[0].mark_price_e4 / 10000
        }
      } catch (e) {}
    }
  }
  
  onMount(() => {
    usdtMode.subscribe(mode => {
      try {
        wss.close()
      } catch (e) {}
      let endpoint = ''
        if (mode) {
          endpoint = mainnet_usdt_ws
        } else {
          endpoint = mainnet_inverse_ws
        }
        wss = new WebSocket(endpoint)
    })
  })
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

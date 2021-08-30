<script>
  import { mainnet_endpoint, mainnet_usdt_endpoint } from '../config/config.js'
  import { onMount } from 'svelte'
  import { usdtMode } from '../config/store.js';

  export let symbol = 'ticker'
  let price = 0
  let mark_price = 0
  let endpoint = ''

  if ($usdtMode) {
    endpoint = mainnet_usdt_endpoint
  } else {
    endpoint = mainnet_endpoint
  }

  onMount(() => {
    const ws = new WebSocket(endpoint)
    
    ws.onopen = (event) => {
      const req = JSON.stringify({
        "op": "subscribe",
        "args": [`instrument_info.100ms.${symbol}`]
      })
      ws.send(req)
    }
    
    ws.onmessage = (event) => {
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
  })
</script>

<div>
  <div class="container">
    <div>
      <p class="ticker">{symbol}</p>
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

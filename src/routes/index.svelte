<script>
  import Pair from '../components/Pair.svelte'
  import Order from '../components/Order.svelte'
  import { inverse, usdtPerp } from '../config/symbol.js'
  import { usdtMode } from '../config/store';
  
  let mode = "USDT"
  let markets = usdtPerp
  let ticker = "BTCUSDT"

  const switchMarket = (pair) => {
    ticker = pair
  }

  const switchMode = () => {
    usdtMode.set(!$usdtMode)
    if ($usdtMode) {
      mode = "USDT"
      markets = usdtPerp
    } else {
      mode = "Inverse"
      markets = inverse
    }
  }
</script>

<div class="container">
  <div style="display: flex; flex-direction: row; height: 100%; align-items: center;">
    <button on:click={switchMode}>{mode} Perpetual</button>
  </div>
  <div style="display: flex; flex-direction: row; gap: 8px;">
    {#each markets as pair}
      <h5 style="cursor: pointer;" on:click={switchMarket(pair)}>{pair}</h5>
    {/each}
  </div>
  <Pair bind:symbol={ticker}></Pair>
  <Order></Order>
</div>

<style>
  :root {
    font-family: -apple-system, BlinkMacSystemFont,'Helvetica Neue',  'Segoe UI', Roboto, Oxygen,
      Ubuntu, Cantarell, 'Open Sans', sans-serif;
  }
</style>

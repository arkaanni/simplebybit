<script>
  let orderType = "0"; // 0 -> limit, 1 -> market
</script>

<div class="form-container">
  <select bind:value={orderType}>
    <option value="0">Limit Order</option>
    <option value="1">Market Order</option>
  </select>

  <input type="number" name="" />
  {#if orderType == "1"}
    <input type="number" name="" />
  {/if}
</div>

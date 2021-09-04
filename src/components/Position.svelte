<script>
  export let positions = []
  
  const fetchPositions = () => {
    fetch("http://localhost:3000/api/position").then(res => res.json()).then(data => {
      positions = data
    }).catch((e) => {})
  }
  
  fetchPositions()

  setInterval(() => {
    fetchPositions()
  }, 10000)
</script>

<div>
  <table>
    <thead>
      <th>Symbol</th>
      <th>Side</th>
      <th>Value</th>
      <th>Margin</th>
      <th>Unrealised PnL</th>
    </thead>
    <tbody>
      {#each positions as position}
        <td>{position.data.symbol}</td>
        <td>{position.data.side}</td>
        <td>{position.data.position_value}</td>
        <td>{position.data.position_margin}</td>
        <td>{position.data.unrealised_pnl}</td>
      {/each}
    </tbody>
  </table>
</div>

<script>
  let balance = {
    "BTC": 0,
    "USDT": 0
  }
  const fetchBalance = async () => {
    const res = await fetch('http://localhost:3000/api/balance').then(data => data.json())
    balance.BTC = res.data.BTC.equity
    balance.USDT = res.data.USDT.equity
  }
  fetchBalance()
</script>

<div>
  <p>BTC: {balance.BTC}</p>
  <p>USDT: {balance.USDT}</p>
</div>

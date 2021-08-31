const subscribeTopic = (topic: string[], ws: WebSocket) => {
  const msg = JSON.stringify({
    op: "subscribe",
    args: topic
  })
  ws.send(msg)
}

const unsubscribeTopic = (topic: string[], ws: WebSocket) => {
  const msg = JSON.stringify({
    op: "unsubscribe",
    args: topic
  })
  ws.send(msg)
}

export {
  subscribeTopic, unsubscribeTopic
}
export default (op: string, topic: string[], ws: WebSocket) => {
  const msg = JSON.stringify({
    op,
    args: topic
  })
  ws.send(msg)
}
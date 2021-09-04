import { writable } from "svelte/store"

const usdtMode = writable(true)
const selectedMarket = writable("ticker")

export {
  usdtMode, selectedMarket
}
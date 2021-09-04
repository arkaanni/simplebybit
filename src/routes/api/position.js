import { mainnet_restapi, api_key } from '../../config/config'
import { generateSignature } from '../../config/auth'
import fetch from 'node-fetch'

const endpoint = `${mainnet_restapi}/private/linear/position/list`

export const get = async () => {
  let resp = {}
  const time = Date.now()
  const sign = generateSignature(`api_key=${api_key}&timestamp=${time}`)
  const url = `${endpoint}?api_key=${api_key}&timestamp=${time}&sign=${sign}`
  await fetch(url).then(res => res.json()).then(data => {
    resp = data.result.filter((r) => r.data.position_value !== 0)
  }).catch((e) => {})

  return {
    body: resp
  }
}
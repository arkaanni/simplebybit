import { api_key } from '../../config/config'
import { generateSignature } from '../../config/auth'
import fetch from 'node-fetch'

const endpoint = "https://api.bytick.com/v2/private/wallet/balance"
const time = Date.now()
const sign = generateSignature(`api_key=${api_key}&timestamp=${time}`)

export const get = async () => {
	const url = `${endpoint}?api_key=${api_key}&timestamp=${time}&sign=${sign}`
	const res = await fetch(url).then(res => res.json()).then(data => data.result)
	return {
		body: {
			data: await res
		}
	}
}

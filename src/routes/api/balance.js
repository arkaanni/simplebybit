import { api_key } from '../../config/config'
import { generateSignature } from '../../config/auth'
import fetch from 'node-fetch'

const endpoint = "https://api.bytick.com/v2/private/wallet/balance"

export const get = async () => {
	let resp = {}
	const time = Date.now()
	const sign = generateSignature(`api_key=${api_key}&timestamp=${time}`)
	const url = `${endpoint}?api_key=${api_key}&timestamp=${time}&sign=${sign}`
	await fetch(url).then(res => res.json()).then(data => {
		resp = data.result
	}).catch((e) => {})
	
	return {
		body: {
			data: resp
		}
	}
}

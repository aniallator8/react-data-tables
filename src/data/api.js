import { URIS } from './CONSTANTS'
import { sampleData } from './sampleData'

/**
 * Fetches data via API call.
 *
 * @param {string} fetchDomain API URL to call.
 * @param {boolean} local Toggle to return local sampleData instead.
 * @return {object} data.result payload.
 */
export const fetchData = async (domain = '', local = false) => {
  // Local alternative for speedy loading
  if(local) {
    return Promise.resolve(sampleData.result)
  }
  // Proxy used for CORS request from localhost:3000
  // TODO - Create ENV variable for local/staging/prod setups
  try {
    const result = await fetch(
      `${URIS.proxyDomain}${domain}`
    )
    const data = await result.json()
    return data.result
    
  } catch (error) {
    console.log(error)
    return null
  }
}
import { sampleData } from '../data/sampleData'
import { URIS } from '../data/CONSTANTS'
import { fetchData } from '../data/api'

beforeAll(() => jest.spyOn(window, 'fetch'))

describe('fetchData api function', () => {
  test('handles successful fetch call as expected', async () => {
    
    fetch.mockResolvedValueOnce(Promise.resolve({
      ok: true,
      json: () => ({
        something: true,
        result: {
          key: 'value'
        }
      })
    }))
    const result = await fetchData('someurl')
    expect(fetch).toHaveBeenCalledWith(`${URIS.proxyDomain}someurl`)
    expect(fetch).toHaveBeenCalledTimes(1)
    expect(result).toMatchObject(
      {key: 'value'}
    )
  })
  test('fetch is not called when local data is requested', async () => {
    const result = await fetchData('someurl', true) // second parameter triggers local data
    expect(fetch).not.toHaveBeenCalledWith(`${URIS.proxyDomain}someurl`)
    expect(fetch).not.toHaveBeenCalledTimes(1)
    expect(result).toMatchObject(
      sampleData.result
    )
  })
})
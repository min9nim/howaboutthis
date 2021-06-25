let $loading
export function initLoading(setAniLoading) {
  let $reqCnt = 0
  $loading = loading => {
    if (loading) {
      $reqCnt++
      setAniLoading(true)
      return
    }
    $reqCnt--
    if ($reqCnt === 0) {
      setAniLoading(false)
    }
  }
}

export async function request(url, data, option) {
  const res = await fetch(
    url,
    Object.assign(
      {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      },
      option,
    ),
  )
  if (!res.ok) {
    window.$logger.warn('res is not ok')
  }
  return res.json()
}

export async function http(url, data, option = {}) {
  try {
    if (option.loading !== false) {
      $loading(true)
    }
    const result = await request(url, data, option).catch(e => {
      if (e.message === 'Failed to fetch') {
        return request(url, data, option)
      }
      throw e
    })
    return result
  } catch (e) {
    alert(e.message)
    throw e
  } finally {
    if (option.loading !== false) {
      $loading(false)
    }
  }
}

export default function req(path, data, option) {
  return http(process.env.REACT_APP_API_URL + '/api/' + path, data, {
    mode: 'cors', // no-cors, cors, *same-origin,
    ...option,
  })
}

export function webscrap(url) {
  return http(process.env.REACT_APP_WEBSCRAP_URL, { url })
}

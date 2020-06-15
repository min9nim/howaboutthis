let $loading
export function initLoading(loading) {
  $loading = loading
}

export async function http(url, data, option) {
  try {
    $loading(true)
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
    $loading(false)
    return res
  } catch (e) {
    $loading(false)
    alert(e.message)
    throw e
  }
}

export default function req(path, data) {
  return http(process.env.REACT_APP_API_URL + '/api/' + path, data, {
    mode: 'cors', // no-cors, cors, *same-origin
  }).then(res => res.json())
}

export function webscrap(url) {
  console.log('process.env.REACT_APP_WEBSCRAP_URL', process.env.REACT_APP_WEBSCRAP_URL)
  return http(process.env.REACT_APP_WEBSCRAP_URL, { url }).then(res => res.json())
}

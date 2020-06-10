export default function req(path, data) {
  return fetch(process.env.REACT_APP_API_URL + '/api/' + path, {
    method: 'POST', // *GET, POST, PUT, DELETE, etc.
    mode: 'cors', // no-cors, cors, *same-origin
    // cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    // credentials: 'same-origin', // include, *same-origin, omit
    headers: {
      'Content-Type': 'application/json',
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    // redirect: 'follow', // manual, *follow, error
    // referrer: 'no-referrer', // no-referrer, *client
    body: JSON.stringify(data), // body data type must match "Content-Type" header
  }).then(res => res.json())
}

export function webscrap(url) {
  console.log('process.env.REACT_APP_WEBSCRAP_URL', process.env.REACT_APP_WEBSCRAP_URL)
  // return fetch(process.env.REACT_APP_WEBSCRAP_URL, {
  return fetch(process.env.REACT_APP_WEBSCRAP_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ url }),
  }).then(res => res.json())
}

export function messageToSlack(text) {
  return fetch(process.env.REACT_APP_SLACK_URL, {
    method: 'POST',
    // mode: 'cors', // no-cors, cors, *same-origin
    // headers: {
    //   'Content-Type': 'application/json',
    // },
    body: JSON.stringify({
      text,
      // channel: process.env.REACT_APP_SLACK_CHANNEL
    }),
  }).then(res => res.text())
}

import React, { useState, useEffect } from 'react'
import req, { webscrap } from './utils/req'
import MenuList from './components/MenuList'
import MenuInfo from './components/MenuInfo'
import { assoc, prop } from 'ramda'
import './App.scss'

function App() {
  const [list, setList] = useState([])
  useEffect(() => {
    req('setting')
      .then(prop('result'))
      .then(setting => {
        window.$SLACK_CHANNEL = setting.SLACK_CHANNEL
      })
    console.log('REACT_APP_WEBSCRAP_URL', process.env.REACT_APP_WEBSCRAP_URL)
    console.log('REACT_APP_API_URL', process.env.REACT_APP_API_URL)
    console.log('REACT_APP_SLACK_URL', process.env.REACT_APP_SLACK_URL)
    console.log('REACT_APP_SLACK_CHANNEL', process.env.REACT_APP_SLACK_CHANNEL)

    req('get-menus').then(prop('result')).then(setList)
  }, [])

  return (
    <div className="App">
      <MenuInfo setList={setList} />
      <hr />
      <MenuList list={list} setList={setList} />
    </div>
  )
}

export default App

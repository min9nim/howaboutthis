import React, { useState, useEffect } from 'react'
import req, { webscrap } from './utils/req'
import MenuList from './components/MenuList'
import MenuInfo from './components/MenuInfo'
import { prop } from 'ramda'
import './App.scss'

function App() {
  const [list, setList] = useState([])
  useEffect(() => {
    console.log('REACT_APP_WEBSCRAP_URL', process.env.REACT_APP_WEBSCRAP_URL)
    console.log('REACT_APP_API_URL', process.env.REACT_APP_API_URL)
    console.log('REACT_APP_SLACK_URL', process.env.REACT_APP_SLACK_URL)
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

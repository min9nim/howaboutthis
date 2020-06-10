import React, { useState, useEffect } from 'react'
import MenuList from './components/MenuList'
import MenuInfo from './components/MenuInfo'
import Loading from './components/Loading'
import { init } from './App.fn'
import './App.scss'

function App() {
  const [list, setList] = useState(null)
  useEffect(() => {
    console.log('REACT_APP_WEBSCRAP_URL', process.env.REACT_APP_WEBSCRAP_URL)
    console.log('REACT_APP_API_URL', process.env.REACT_APP_API_URL)
    console.log('REACT_APP_SLACK_URL', process.env.REACT_APP_SLACK_URL)
    console.log('REACT_APP_SLACK_CHANNEL', process.env.REACT_APP_SLACK_CHANNEL)

    init({ setList })
  }, [])

  return (
    <div className="App">
      <MenuInfo setList={setList} />
      <hr />
      {!list ? <Loading /> : <MenuList list={list} setList={setList} />}
    </div>
  )
}

export default App

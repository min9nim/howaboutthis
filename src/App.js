import React, { useState, useEffect } from 'react'
import req, { webscrap } from './utils/req'
import MenuList from './components/MenuList'
import MenuInfo from './components/MenuInfo'
import './App.scss'

function App() {
  const [selected, setSelected] = useState({})
  const [list, setList] = useState([])
  useEffect(() => {
    req('get-menus')
      .then(res => {
        return Promise.all(
          res.result.map(async menu => {
            menu.info = await webscrap(menu.url)
            return menu
          }),
        )
      })
      .then(setList)
  }, [])

  return (
    <div className="App">
      <MenuInfo menu={selected} setList={setList} />
      <hr />
      <MenuList list={list} setSelected={setSelected} />
    </div>
  )
}

export default App

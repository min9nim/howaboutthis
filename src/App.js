import React, { useState, useEffect } from 'react'
import MenuList from './components/MenuList'
import AddMenu from './components/AddMenu'
import { init } from './App.fn'
import './App.scss'
import Loading from './components/Loading'

function App() {
  const [list, setList] = useState([])
  const [aniLoading, setAniLoading] = useState(false)
  const [addMenuVisible, setAddMenuVisible] = useState(false)
  useEffect(() => {
    console.log('REACT_APP_WEBSCRAP_URL', process.env.REACT_APP_WEBSCRAP_URL)
    console.log('REACT_APP_API_URL', process.env.REACT_APP_API_URL)
    console.log('REACT_APP_SLACK_CHANNEL', process.env.REACT_APP_SLACK_CHANNEL)

    init({ setList, setAniLoading })
  }, [])

  return (
    <div className="App">
      {aniLoading && <Loading />}
      {addMenuVisible && (
        <AddMenu setList={setList} setAddMenuVisible={setAddMenuVisible} setAniLoading={setAniLoading} />
      )}
      <MenuList list={list} setList={setList} setAddMenuVisible={setAddMenuVisible} setAniLoading={setAniLoading} />
    </div>
  )
}

export default App

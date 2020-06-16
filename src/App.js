import React, { useState, useEffect } from 'react'
import MenuList from './components/MenuList'
import AddMenu from './components/AddMenu'
import { init } from './App.fn'
import './App.scss'
import Loading from './components/Loading'

function App() {
  const [list, setList] = useState([])
  const [selected, setSelected] = useState(null)
  const [aniLoading, setAniLoading] = useState(false)
  const [addMenuVisible, setAddMenuVisible] = useState(false)
  useEffect(() => {
    init({ setList, setAniLoading })
  }, [])

  return (
    <div className="App">
      {aniLoading && <Loading />}
      {addMenuVisible && (
        <AddMenu
          setList={setList}
          setAddMenuVisible={setAddMenuVisible}
          setAniLoading={setAniLoading}
          menu={selected}
        />
      )}
      <MenuList
        list={list}
        setList={setList}
        setAddMenuVisible={setAddMenuVisible}
        setAniLoading={setAniLoading}
        setSelected={menu => {
          setSelected(menu)
          if (menu) {
            setAddMenuVisible(true)
            window.scrollTo(0, 0)
          }
        }}
      />
    </div>
  )
}

export default App

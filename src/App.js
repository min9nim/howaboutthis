import React, { useState } from 'react'
import req from './utils/req'
import './App.scss'

function App() {
  const [title, setTitle] = useState('')
  const [category, setCategory] = useState('')
  const [url, setUrl] = useState('')
  function addMenu() {
    req('add-menu', { title, category, url })
  }
  return (
    <div className="App">
      <h2>식당 추가</h2>
      <div className="item">
        <label>식당이름: </label>
        <input value={title} onChange={e => setTitle(e.target.value)} />
      </div>
      <div className="item">
        <label>분류: </label>
        <input value={category} onChange={e => setCategory(e.target.value)} />
      </div>
      <div className="item">
        <label>URL: </label>
        <input value={url} onChange={e => setUrl(e.target.value)} />
      </div>
      <div className="item">
        <button onClick={addMenu}>추가</button>
      </div>
      <hr />
      <h2>식당 목록</h2>
    </div>
  )
}

export default App

import React, { useState } from 'react'
import req from '../utils/req'

export default function MenuInfo({ menu = {} }) {
  const [url, setUrl] = useState(menu.url)
  const [title, setTitle] = useState(menu.title)
  const [desc, setDesc] = useState(menu.desc)

  function addMenu() {
    req('add-menu', { title, url, desc })
  }

  return (
    <div className="MenuInfo">
      <h2>식당 정보</h2>
      <div className="item">
        <label>URL: </label>
        <input value={url} onChange={e => setUrl(e.target.value)} />
      </div>
      <div className="item">
        <label>식당이름: </label>
        <input value={title} onChange={e => setTitle(e.target.value)} />
      </div>
      <div className="item">
        <label>설명: </label>
        <input value={desc} onChange={e => setDesc(e.target.value)} />
      </div>
      <div className="item">
        <button onClick={addMenu}>추가</button>
        <button onClick={addMenu}>저장</button>
        <button onClick={addMenu}>삭제</button>
      </div>
    </div>
  )
}

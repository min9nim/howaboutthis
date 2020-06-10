import React, { useState } from 'react'
import req, { webscrap } from '../utils/req'
import { append } from 'ramda'
import './MenuInfo.scss'

export default function MenuInfo({ setList }) {
  const [url, setUrl] = useState('')
  const [title, setTitle] = useState('')
  const [desc, setDesc] = useState('')
  const [image, setImage] = useState('')

  const urlOnBlur = async () => {
    const { title, desc, image } = await webscrap(url)
    setTitle(title)
    setDesc(desc)
    setImage(image)
  }

  const addMenu = async () => {
    const { result } = await req('add-menu', { title, url, desc, image })
    setList(append(result))
    setUrl('')
    setTitle('')
    setDesc('')
    setImage('')
  }

  return (
    <div className="MenuInfo">
      <h2>식당 추가</h2>
      <div className="wrapper">
        <div className="input">
          <div className="item">
            <label>URL: </label>
            <input value={url} onChange={e => setUrl(e.target.value)} onBlur={urlOnBlur} />
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
            <label>이미지: </label>
            <input value={image} onChange={e => setImage(e.target.value)} />
          </div>
        </div>
        <div className="image">{image && <img src={image} alt="식당이미지" />}</div>
      </div>
      <div className="item">
        <button onClick={addMenu}>추가</button>
      </div>
    </div>
  )
}

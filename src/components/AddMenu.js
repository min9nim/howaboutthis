import React, { useState } from 'react'
import req, { webscrap } from '../utils/req'
import { prepend, prop } from 'ramda'
import './AddMenu.scss'

export default function AddMenu({ setList, setAddMenuVisible, setAniLoading }) {
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
    if (!url) {
      alert('url 을 입력해 주세요')
      return
    }
    // setAniLoading(true)
    const result = await req('add-menu', { title, url, desc, image }).then(prop('result'))
    setList(prepend(result))
    setUrl('')
    setTitle('')
    setDesc('')
    setImage('')
    setAddMenuVisible(false)
    // setAniLoading(false)
  }

  return (
    <>
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
        <div className="btnGroup">
          <button onClick={addMenu}>저장</button>
          <button onClick={() => setAddMenuVisible(false)}>취소</button>
        </div>
      </div>
      <hr />
    </>
  )
}

import React, { useEffect, useState, useRef } from 'react'
import req, { webscrap } from '../utils/req'
import { assoc, complement, filter, pipe, prepend, prop, propEq } from 'ramda'
import './AddMenu.scss'

export default function AddMenu({ setList, setAddMenuVisible, menu }) {
  const [url, setUrl] = useState('')
  const inputUrl = useRef(null)
  const [title, setTitle] = useState('')
  const [desc, setDesc] = useState('')
  const [image, setImage] = useState('')
  const [loadingMsg, setLoadingMsg] = useState('')

  useEffect(() => {
    if (menu?._id) {
      setUrl(menu.url)
      setTitle(menu.title)
      setDesc(menu.desc)
      setImage(menu.image)
    }
  }, [menu?._id])

  const urlOnBlur = async () => {
    if (menu?._id) {
      return
    }
    if (!url.startsWith('http')) {
      alert('입력하신 url 정보를 확인하세요')
      // inputUrl.current.focus()
      return
    }
    setLoadingMsg('loading..')
    const { title, desc, image } = await webscrap(url)
    setLoadingMsg('')
    setTitle(title)
    setDesc(desc)
    setImage(image)
  }

  const addMenu = async () => {
    if (!url) {
      alert('url 을 입력해 주세요')
      inputUrl.current.focus()
      return
    }
    // setAniLoading(true)
    const result = await req('add-menu', { title, url, desc, image })
      .then(prop('result'))
      .then(assoc('comments', []))
    setList(prepend(result))
    setUrl('')
    setTitle('')
    setDesc('')
    setImage('')
    setAddMenuVisible(false)
    // setAniLoading(false)
  }

  const updateMenu = async () => {
    if (!url) {
      alert('url 을 입력해 주세요')
      inputUrl.current.focus()
      return
    }
    // setAniLoading(true)
    const result = await req('update-menu', {
      _id: menu._id,
      title,
      url,
      desc,
      image,
    }).then(prop('result'))
    setList(pipe(filter(complement(propEq('_id', menu._id))), prepend(result)))
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
              <input
                value={url}
                onChange={e => setUrl(e.target.value)}
                onBlur={urlOnBlur}
                ref={inputUrl}
              />
            </div>
            <div className="item">
              <label>식당이름: </label>
              <input
                value={title}
                onChange={e => setTitle(e.target.value)}
                placeholder={loadingMsg}
              />
            </div>
            <div className="item">
              <label>설명: </label>
              <input
                value={desc}
                onChange={e => setDesc(e.target.value)}
                placeholder={loadingMsg}
              />
            </div>
            <div className="item">
              <label>이미지: </label>
              <input
                value={image}
                onChange={e => {
                  console.log('image onChange', e.target.value)
                  setImage(e.target.value)
                }}
                placeholder={loadingMsg}
              />
            </div>
          </div>
          <div className="image">
            {image && <img src={image} alt="식당이미지" />}
          </div>
        </div>
        <div className="btnGroup">
          <button onClick={menu?._id ? updateMenu : addMenu}>저장</button>
          <button onClick={() => setAddMenuVisible(false)}>취소</button>
        </div>
      </div>
      <hr />
    </>
  )
}

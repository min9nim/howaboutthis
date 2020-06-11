import React, { useState, useEffect } from 'react'
import { getHostname } from 'mingutils'
import { propEq, complement, prop, append } from 'ramda'
import './MenuList.scss'
import req, { messageToSlack, webscrap } from '../utils/req'
import { stop, loading } from '../utils'

const toSlack = async _id => {
  loading(true)
  if (_id) {
    await req('menu-to-slack?_id=' + _id)
  } else {
    await req('menu-to-slack')
  }
  loading(false)
}

export default function MenuList({ list, setList, setAddMenuVisible, setAniLoading }) {
  const deleteMenu = async _id => {
    if (!window.confirm('삭제합니다')) {
      return
    }

    setAniLoading(true)
    await req('delete-menu', { _id })
    setList(list => list.filter(complement(propEq('_id', _id))))
    setAniLoading(false)
  }

  const addMenu = async () => {
    const text = await navigator.clipboard.readText()
    if (text?.indexOf('http') === 0) {
      setAniLoading(true)
      const info = await webscrap(text)
      if (info.title) {
        const result = await req('add-menu', info).then(prop('result'))
        setList(append(result))
        setAniLoading(false)
        return
      }
    }
    setAddMenuVisible(true)
  }

  return (
    <div className="menuList">
      <header>
        <div>
          <h2>강남역 식당 🍚🍱🍣</h2>
        </div>
        <div className="menu">
          <button className="add" onClick={addMenu}>
            식당추가➕
          </button>
          <button className="random" onClick={() => toSlack()}>
            랜덤추천👍 to {window.$SLACK_CHANNEL}
          </button>
        </div>
      </header>
      <ul>
        {list.map(({ _id, title, url, image, desc }) => (
          <li key={_id}>
            <div className="wrapper">
              <h4
                className="title"
                onClick={() => {
                  window.open(url, '_blank')
                }}
              >
                {title}
              </h4>
              <div className="content">
                <div className="desc">
                  <div
                    className="url"
                    onClick={() => {
                      window.open(url, '_blank')
                    }}
                  >
                    {url && getHostname(url)}
                  </div>
                  <div
                    className="description"
                    onClick={() => {
                      window.open(url, '_blank')
                    }}
                  >
                    {desc}
                  </div>
                  <div className="btnGroup">
                    <button onClick={stop(() => deleteMenu(_id))}>🗑️ 삭제</button>
                    <button onClick={stop(() => toSlack(_id))}>👍 추천 to {window.$SLACK_CHANNEL}</button>
                  </div>
                </div>
                <div
                  className="image"
                  onClick={() => {
                    window.open(url, '_blank')
                  }}
                >
                  <img src={image} alt={title} />
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}

import React, { useState, useEffect } from 'react'
import { getHostname } from 'mingutils'
import { propEq, complement } from 'ramda'
import './MenuList.scss'
import req, { messageToSlack } from '../utils/req'
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

  return (
    <div className="menuList">
      <header>
        <div>
          <h2>강남역 식당 🍚🍱🍣</h2>
        </div>
        <div className="menu">
          <button onClick={() => setAddMenuVisible(true)}>식당추가</button>
          <button onClick={() => toSlack()}>랜덤추천 to {window.$SLACK_CHANNEL}</button>
        </div>
      </header>
      <ul>
        {list.map(({ _id, title, url, image, desc }) => (
          <li key={_id}>
            <div className="wrapper">
              <h4>{title}</h4>
              <div
                className="content"
                onClick={() => {
                  window.open(url, '_blank')
                }}
              >
                <div className="desc">
                  <div className="url">{getHostname(url)}</div>
                  <div className="description">{desc}</div>
                  <div>
                    <button onClick={stop(() => deleteMenu(_id))}>삭제</button>
                    <button onClick={stop(() => toSlack(_id))}>슬랙전송</button>
                  </div>
                </div>
                <div className="image">
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

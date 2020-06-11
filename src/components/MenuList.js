import React, { useState, useEffect } from 'react'
import { getHostname } from 'mingutils'
import { propEq, complement, prop, append } from 'ramda'
import Menu from './Menu'
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
        {list.map(menu => (
          <li key={menu._id}>
            <Menu {...menu} deleteMenu={deleteMenu} toSlack={toSlack} />
          </li>
        ))}
      </ul>
    </div>
  )
}

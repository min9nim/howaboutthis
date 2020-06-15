import React from 'react'
import { propEq, complement, prop, prepend } from 'ramda'
import Menu from './Menu'
import './MenuList.scss'
import req, { webscrap } from '../utils/req'
import { loading } from '../utils'

const toSlack = async _id => {
  loading(true)
  await req('menu-to-slack', { _id, channel: window.$SLACK_CHANNEL })
  loading(false)
}

export default function MenuList({ list, setList, setAddMenuVisible, setSelected }) {
  const deleteMenu = async _id => {
    if (!window.confirm('삭제합니다')) {
      return
    }

    // setAniLoading(true)
    await req('delete-menu', { _id })
    setList(list => list.filter(complement(propEq('_id', _id))))
    // setAniLoading(false)
  }

  const addMenu = async () => {
    setSelected(null)
    const text = await navigator.clipboard.readText()
    if (text?.indexOf('http') === 0) {
      // setAniLoading(true)
      const info = await webscrap(text)
      if (info.title) {
        const result = await req('add-menu', info).then(prop('result'))
        setList(prepend(result))
        // setAniLoading(false)
        return
      }
    }
    setAddMenuVisible(true)
  }

  return (
    <div className="menuList">
      <header>
        <div>
          <h2>강남역 맛집 🍚🍱🍣</h2>
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
            <Menu {...menu} deleteMenu={deleteMenu} toSlack={toSlack} setSelected={setSelected} />
          </li>
        ))}
      </ul>
    </div>
  )
}

import React, { useState, useEffect } from 'react'
import { getHostname } from 'mingutils'
import { propEq, complement } from 'ramda'
import './MenuList.scss'
import req, { messageToSlack } from '../utils/req'
import { stop } from '../utils'

const toSlack = async _id => {
  await req('menu-to-slack?_id=' + _id)
}

export default function MenuList({ list, setList }) {
  const deleteMenu = async _id => {
    if (!window.confirm('삭제합니다')) {
      return
    }

    await req('delete-menu', { _id })
    setList(list => list.filter(complement(propEq('_id', _id))))
  }

  return (
    <div className="menuList">
      <h2>식당 목록</h2>
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

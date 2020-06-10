import React, { useState, useEffect } from 'react'
import { getHostname } from 'mingutils'
import { propEq, complement } from 'ramda'
import './MenuList.scss'
import req, { messageToSlack } from '../utils/req'

const toSlack = async ({ title, url, image, desc }) => {
  const message = `오늘 메뉴 추천 🌈🚀
${title}
${url}`
  await messageToSlack(message)
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
                  <div>{getHostname(url)}</div>
                  <div>{desc}</div>
                </div>
                <div className="image">
                  <img src={image} alt={title} />
                </div>
              </div>
              <button onClick={() => deleteMenu(_id)}>삭제</button>
              <button onClick={() => toSlack({ title, url, image, desc })}>슬랙전송</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}

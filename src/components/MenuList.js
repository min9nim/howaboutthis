import React, { useState, useEffect } from 'react'
import { getHostname } from 'mingutils'
import './MenuList.scss'

export default function MenuList({ list, setSelected }) {
  return (
    <div className="menuList">
      <h2>식당 목록</h2>
      <ul>
        {list.map(({ _id, title, category, url, info }) => (
          <li
            key={_id}
            onClick={() => {
              console.log(222, { _id, title, category, url, info })
              setSelected({ _id, title, category, url, info })
            }}
          >
            <div className="wrapper">
              <h4>{title}</h4>
              <div className="content">
                <div className="desc">
                  <div>{getHostname(url)}</div>
                  <div>{category}</div>
                  <div>{info.desc}</div>
                </div>
                <div className="image">
                  <img src={info.image} alt={info.title} />
                </div>
              </div>
              <button>삭제</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}

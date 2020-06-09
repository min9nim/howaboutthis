import React, { useState, useEffect } from 'react'
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
            <div>
              <h4>{title}</h4>
              <div>
                <div>{url}</div>
                <div>{category}</div>
                <div>{info.desc}</div>
                <img src={info.image} alt={info.title} />
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}

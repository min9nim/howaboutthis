import React, { useState, useEffect } from 'react'
import { getHostname } from 'mingutils'
import { propEq, complement } from 'ramda'
import './MenuList.scss'
import req from '../utils/req'

export default function MenuList({ list, setList }) {
  const deleteMenu = async _id => {
    console.log('_id', _id)
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
              <div className="content">
                <div className="desc">
                  <div>{getHostname(url)}</div>
                  <div>{desc}</div>
                </div>
                <div className="image">
                  <img src={image} alt={title} />
                </div>
              </div>
              <button onClick={() => deleteMenu(_id)}>삭제</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}

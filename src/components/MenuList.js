import React, { useState, useEffect } from 'react'
import req, { webscrap } from '../utils/req'

function App() {
  const [list, setList] = useState([])
  useEffect(() => {
    req('get-menus')
      .then(res => {
        return Promise.all(
          res.result.map(async menu => {
            menu.info = await webscrap(menu.url)
            return menu
          }),
        )
      })
      .then(setList)
  }, [])

  return (
    <div className="menuList">
      <h2>식당 목록</h2>
      <ul>
        {list.map(({ _id, title, category, url, info }) => (
          <li key={_id}>
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

export default App

import React, { useState } from 'react'
import { getHostname } from 'mingutils'
import { stop } from '../utils'
import './Menu.scss'
import CommentForm from './CommentForm'
import CommentList from './CommentList'

export default function Menu({
  _id,
  title,
  url,
  image,
  desc,
  comments,
  deleteMenu,
  toSlack,
  setSelected,
}) {
  const [commentList, setCommentList] = useState([])
  return (
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
            <button
              onClick={() => setSelected({ _id, title, url, image, desc })}
            >
              📝 수정
            </button>
            <button onClick={stop(() => toSlack(_id))}>
              👍 추천 to {window.$SLACK_CHANNEL}
            </button>
          </div>
        </div>
        {image && (
          <div
            className="image"
            onClick={() => {
              window.open(url, '_blank')
            }}
          >
            <img src={image} alt={title} />
          </div>
        )}
      </div>
      <CommentList list={commentList} />
      <CommentForm menuId={_id} setCommentList={setCommentList} />
      <hr color="#f0f0f0" />
    </div>
  )
}

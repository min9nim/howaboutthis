import React, { useEffect, useRef, useState } from 'react'
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
  const [commentList, setCommentList] = useState(comments)
  const imgRef = useRef()

  useEffect(() => {
    const loadImage = img => {
      if (!img.src) {
        img.src = image
      }
    }
    console.log('imgRef.current', imgRef.current)
    if (imgRef.current) {
      observeDom(imgRef.current, loadImage)
    }
  }, [image])
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
            {image && <img ref={imgRef} alt={title} />}
            {desc}
          </div>
          <div className="btnGroup">
            {comments?.length === 0 && (
              <button onClick={stop(() => deleteMenu(_id))}>🗑️ 삭제</button>
            )}
            <button
              onClick={() => setSelected({ _id, title, url, image, desc })}
            >
              📝 수정
            </button>
            {/*<button onClick={stop(() => toSlack(_id))}>*/}
            {/*  👍 추천 to {window.$SLACK_CHANNEL}*/}
            {/*</button>*/}
          </div>
        </div>
      </div>
      <CommentList list={commentList} setList={setCommentList} />
      <CommentForm menuId={_id} setCommentList={setCommentList} />
      <hr color="#f0f0f0" />
    </div>
  )
}

function observeDom(dom, callback) {
  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) {
        return
      }
      callback(entry.target)
      observer.unobserve(entry.target)
    })
  })
  observer.observe(dom)
  return () => {
    observer.unobserve(dom)
  }
}

import React from 'react'
import './CommentItem.scss'

export default function CommentItem({ item }) {
  const { author, content } = item
  return (
    <li className="comment-item">
      <div className="author">{author})</div>{' '}
      <div className="content">{content}</div>{' '}
      <div className="delete-btn">x️</div>
    </li>
  )
}

import React from 'react'
import './CommentForm.scss'

export default function CommentItem({ item }) {
  const { author, content } = item
  return (
    <li style={{ color: '#888', padding: '5px 0' }}>
      {author}) {content}
    </li>
  )
}

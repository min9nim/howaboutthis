import React, { useState } from 'react'
import './CommentForm.scss'

export default function CommentForm() {
  const [author, setAuthor] = useState('')
  const [content, setContnt] = useState('')
  return (
    <section className="comment-form">
      <input value={author} onChange={e => setAuthor(e.target.value)} placeholder="이름" />
      <textarea onChange={e => setContnt(e.target.value)} placeholder="내용">
        {content}
      </textarea>
    </section>
  )
}

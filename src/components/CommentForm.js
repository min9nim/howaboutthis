import React, { useRef, useState } from 'react'
import './CommentForm.scss'
import req from '../utils/req'
import { append, prepend, prop } from 'ramda'

export default function CommentForm({ menuId, setCommentList }) {
  const [author, setAuthor] = useState('')
  const [content, setContnt] = useState('')
  const contentRef = useRef(null)
  const addComment = async () => {
    if (!content) {
      alert('내용을 입력해 주세요')
      contentRef.current.focus()
      return
    }
    // setAniLoading(true)
    const result = await req('add-comment', { menuId, author, content }).then(
      prop('result'),
    )
    setCommentList(append(result))
    setAuthor('')
    setContnt('')
    // setAniLoading(false)
  }
  return (
    <section className="comment-form">
      <input
        value={author}
        onChange={e => setAuthor(e.target.value)}
        placeholder="이름"
      />
      <textarea
        ref={contentRef}
        onChange={e => setContnt(e.target.value)}
        placeholder="맛집리뷰"
        value={content}
      />
      <button onClick={addComment}>저장</button>
    </section>
  )
}

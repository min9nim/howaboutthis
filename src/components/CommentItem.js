import React from 'react'
import './CommentItem.scss'
import req from '../utils/req'
import { complement, propEq } from 'ramda'
import { nl2br } from 'mingutils/dist'

export default function CommentItem({ item, setList }) {
  const { _id, author, content } = item

  const handleDelete = async () => {
    if (!window.confirm('삭제합니다')) {
      return
    }
    await req('delete-menu', { _id })
    setList(list => list.filter(complement(propEq('_id', _id))))
  }
  return (
    <li className="comment-item">
      <div className="author">{author || '익명'})</div>
      <div
        className="content"
        dangerouslySetInnerHTML={{ __html: nl2br(content) }}
      />
      <div className="delete-btn" onClick={handleDelete}>
        x️
      </div>
    </li>
  )
}

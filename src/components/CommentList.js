import React from 'react'
import './CommentForm.scss'
import CommentItem from './CommentItem'

export default function CommentList({ list = [], setList }) {
  return (
    <ul>
      {list.map((item, idx) => {
        return <CommentItem key={idx} item={item} setList={setList} />
      })}
    </ul>
  )
}

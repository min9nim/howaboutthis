import React, { useRef, useState } from 'react'
import './CommentForm.scss'
import req from '../utils/req'
import { prepend, prop } from 'ramda'
import CommentItem from './CommentItem'

export default function CommentList({ list, setList }) {
  return (
    <ul>
      {list.map((item, idx) => {
        return <CommentItem key={idx} item={item} setList={setList} />
      })}
    </ul>
  )
}

import React, { useRef, useState } from 'react'
import './CommentForm.scss'
import req from '../utils/req'
import { prepend, prop } from 'ramda'
import CommentItem from './CommentItem'

export default function CommentList({ list }) {
  return (
    <ul>
      {list.map((item, idx) => {
        console.log(item)
        return <CommentItem key={idx} item={item} />
      })}
    </ul>
  )
}

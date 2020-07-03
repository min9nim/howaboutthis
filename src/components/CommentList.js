import React, { useRef, useState } from 'react'
import './CommentForm.scss'
import req from '../utils/req'
import { prepend, prop } from 'ramda'

export default function CommentList({ list }) {
  return (
    <ul>
      {list.map(item => (
        <li key={item.content}>{item.content}</li>
      ))}
    </ul>
  )
}

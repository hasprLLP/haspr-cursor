import React, { useEffect } from 'react'
import Cursor from './cursor.js'
import { GlobalCursor, CURSOR_SHOW, CURSOR_HIDE } from './actions.js'

export default function HasprCursor({ children }) {
  useEffect(() => {
    document.addEventListener('mouseenter', () => {
      CURSOR_SHOW()
    })

    document.addEventListener('mouseleave', event => {
      if (event.clientY <= 0 || event.clientX <= 0 || event.clientX >= window.innerWidth || event.clientY >= window.innerHeight) {
        CURSOR_HIDE()
      }
    })
  }, [])

  return (
    <GlobalCursor>
      <Cursor />
      {children}
    </GlobalCursor>
  )
}

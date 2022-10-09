import React, { createContext, useReducer, useContext } from 'react' //` Reducer and Context API
import { gsap, Power3 } from 'gsap/dist/gsap.js' //` GSAP Animation Engine

//$ Cursor Ref from DOM
const deviceWidth = typeof window !== 'undefined' ? window.innerWidth : 0
const isDesktop = deviceWidth > 1200 ? true : false

//$ Define Global Cursor Context
const GlobalStateContext = createContext()
const GlobalDispatchContext = createContext()

//$ Define Cursor Reducer
const globalReducer = (state, action) => {
  switch (action.type) {
    case 'SET_STICKY': {
      return {
        ...state,
        sticky: action.value,
      }
    }
    case 'SET_MAGNETIC': {
      return {
        ...state,
        magnetic: action.value,
      }
    }
    case 'SET_INTENSITY': {
      return {
        ...state,
        intensity: action.value,
      }
    }
    case 'SET_JELLY': {
      return {
        ...state,
        jelly: action.value,
      }
    }
    case 'SET_TEXT': {
      return {
        ...state,
        text: action.value,
      }
    }
    case 'SET_PHOTO': {
      return {
        ...state,
        photo: action.value,
      }
    }
    case 'SET_VIDEO': {
      return {
        ...state,
        video: action.value,
      }
    }
    case 'SET_THEME': {
      return {
        ...state,
        theme: action.value,
      }
    }
    case 'SET_SHOWREEL': {
      return {
        ...state,
        showreel: action.value,
      }
    }
    case 'SET_LOADED': {
      return {
        ...state,
        loaded: action.value,
      }
    }
    case 'SET_SEQUENCE': {
      return {
        ...state,
        sequence: action.value,
      }
    }
    default: {
      throw new Error(`Unhandled action type: ${action.type}`)
    }
  }
}

//$ Initial States
const initialStates = {
  sticky: null,
  magnetic: null,
  intensity: 800,
  jelly: false,
  text: '',
  photo: '',
  video: '/static/videos/showreel/cursor-reel.mp4',
  theme: 'LIGHT_MODE',
  showreel: false,
  loaded: false,
  sequence: null,
}

//$ Cursor Provider (App Wrapper)
export const GlobalCursor = ({ children }) => {
  //@ Global Cursor Reducer Function
  const [state, dispatch] = useReducer(globalReducer, initialStates)

  return (
    <GlobalDispatchContext.Provider value={dispatch}>
      <GlobalStateContext.Provider value={state}>{children}</GlobalStateContext.Provider>
    </GlobalDispatchContext.Provider>
  )
}

//& Used To Set or Get Cursor Actions from Anywhere
export const SelectCursor = () => useContext(GlobalStateContext)

export const DispatchCursor = () => useContext(GlobalDispatchContext)

//& Cursor Animation Actions

//@ 0: Array of All Timeouts Deployed Below
const timeoutIDs = [] //` Crucial for Forcefully Clearing Timeouts

//$ 0: Show Cursor
export const CURSOR_SHOW = () => {
  const cursor = document.getElementById('cursor-id')
  isDesktop && cursor.classList.remove('-hidden') //` Remove -hidden Class
}

//$ 1: Hide Cursor
export const CURSOR_HIDE = () => {
  const cursor = document.getElementById('cursor-id')
  isDesktop && cursor.classList.add('-hidden') //` Add -hidden Class
}

//$ 2: Set Cursor Color
export const CURSOR_COLOR = color => {
  //` Append Class of Cursor to Include Given Color Class
  if (isDesktop) {
    const cursor = document.getElementById('cursor-id')
    if (color) {
      cursor.className = `cursor -color-${color.toLowerCase()}`
    } else cursor.className = 'cursor'
  }
}

//$ 3: Page Cursor Color
export const CURSOR_PAGECOLOR = color => {
  isDesktop && CURSOR_SHOW()
  isDesktop && CURSOR_COLOR(color || 'BLACK')
}

//$ 4: Set Cursor Jelly Blob Text
export const CURSOR_TEXT = (dispatch, text, color) => {
  if (isDesktop) {
    const cursor = document.getElementById('cursor-id')
    if (text !== 'END') {
      //@ Do-While ACTIVE
      color && CURSOR_COLOR(color) //` Set Color from props
      dispatch({ type: 'SET_TEXT', value: text }) //` Dispatch Text Inside
      dispatch({ type: 'SET_JELLY', value: true }) //` Dispatch Jelly Activator
      cursor.classList.add('-text') //` Add -text Class to Cursor
      const id = window.setTimeout(() => {
        for (let i = 0; i < timeoutIDs.length; i++) {
          window.clearTimeout(timeoutIDs[i])
        }
      }, 0)
      dispatch({ type: 'SET_INTENSITY', value: 400 }) //` Set Jelly Blob Strength
      gsap.to(document.getElementById('cursor-text'), {
        duration: 0.55,
        scale: 1,
        ease: Power3.easeOut,
      }) //` Post Animation Data to Cursor Inner Text
    } else if (text === 'END') {
      //@ Do-While STOPPED
      CURSOR_COLOR(color || 'BLACK') //` Reset Color
      const id = setTimeout(() => {
        dispatch({ type: 'SET_TEXT', value: null })
        dispatch({ type: 'SET_JELLY', value: false })
        dispatch({ type: 'SET_INTENSITY', value: 1200 })
      }, 550) //` Cleanup after Animation End
      timeoutIDs.push(id) //` Push This to Live Timeouts
      cursor.classList.remove('-text')
      gsap.to(document.getElementById('cursor-text'), {
        duration: 0.55,
        scale: 0,
        ease: Power3.easeOut,
      }) //` Hide Inner Text
    }
  }
}

//$ 5: Set Cursor in Exclusion Mode
export const CURSOR_EXCLUSION = (dispatch, state) => {
  if (isDesktop) {
    const cursor = document.getElementById('cursor-id')
    if (state === 'START') {
      cursor.classList.add('-opaque') //` Do-While ACTIVE
      dispatch({ type: 'SET_JELLY', value: true })
    } else if (state === 'END') {
      cursor.classList.remove('-opaque') //` Do-While STOPPED
      dispatch({ type: 'SET_JELLY', value: false })
    }
  }
}

//$ 6: Set Cursor Sticky Area
export const CURSOR_STICKY = (dispatch, stick, size) => {
  if (isDesktop) {
    const cursor = document.getElementById('cursor-id')
    if (stick !== 'END') {
      CURSOR_SHOW()
      cursor.classList.add('-exclusion', size === 'SMALL' ? '-small' : size === 'MEDIUM' ? '-med' : null) //` Add -exclusion and -med class
      dispatch({ type: 'SET_STICKY', value: stick }) //` Dispatch Sticky Area for  Cursor
    } else if (stick === 'END') {
      cursor.classList.remove('-exclusion', '-small') //` Remove -exclusion and -med class
      dispatch({ type: 'SET_STICKY', value: null }) //` Cleanup
    }
  }
}

//$ 7: Set Cursor Magnetic Area
export const CURSOR_MAGNETIC = (dispatch, magnetic) => {
  if (isDesktop) {
    const cursor = document.getElementById('cursor-id')
    if (magnetic !== 'END') {
      cursor.classList.add('-opaque') //` Add -opaque class
      dispatch({ type: 'SET_MAGNETIC', value: magnetic }) //` Dispatch Magnetic Area for  Cursor
    } else if (magnetic === 'END') {
      cursor.classList.remove('-opaque') //` Remove -opaque class
      dispatch({ type: 'SET_MAGNETIC', value: null }) //` Cleanup
    }
  }
}

//$ 8: Set Cursor Jelly Video Inside
export const CURSOR_VIDEO = (dispatch, video, size) => {
  if (isDesktop) {
    const cursor = document.getElementById('cursor-id')
    if (video !== 'END') {
      //@ Do-While ACTIVE
      cursor.classList.add('-color-correct') //` Add Class for Color Correction
      const id = window.setTimeout(() => {
        for (let i = 0; i < timeoutIDs.length; i++) {
          window.clearTimeout(timeoutIDs[i])
        }
      }, 0)
      dispatch({ type: 'SET_JELLY', value: true }) //` Jellify
      dispatch({
        type: 'SET_INTENSITY',
        value: size === 'SMALL' ? 500 : size === 'MEDIUM' ? 800 : size === 'LARGE' ? 1000 : 300,
      }) //` Set Jelly Strength acc to Cursor Size
      dispatch({ type: 'SET_VIDEO', value: video }) //` Dispatch Video to Cursor
      gsap.to(document.getElementById('media-id'), {
        duration: 0.65,
        scale: size === 'SMALL' ? 0.5 : size === 'MEDIUM' ? 0.8 : size === 'LARGE' ? 1.45 : 0,
        ease: Power3.easeOut,
      }) //` Post Animation Data to Cursor Video
    } else if (video === 'END') {
      cursor.classList.remove('-color-correct') //` Remove Class
      const id = setTimeout(() => {
        dispatch({ type: 'SET_VIDEO', value: '' })
        dispatch({
          type: 'SET_INTENSITY',
          value: size === 'SMALL' ? 500 : size === 'MEDIUM' ? 800 : size === 'LARGE' ? 1000 : 300,
        })
        dispatch({ type: 'SET_JELLY', value: false })
      }, 550) //` Cleanup
      timeoutIDs.push(id) //` Push This to Live Timeouts
      gsap.to(document.getElementById('media-id'), {
        duration: 0.55,
        scale: size === 'SMALL' ? 0.5 : size === 'MEDIUM' ? 0.8 : size === 'LARGE' ? 1.45 : 0,
        ease: Power3.easeOut,
      }) //` Reset Cursor Video
    }
  }
}

//$ 9: Set Cursor Hovered Text Reveal Animation
export const CURSOR_REVEAL = (dispatch, status, id, size) => {
  if (isDesktop) {
    const cursor = document.getElementById('cursor-id')
    if (status !== 'END') {
      dispatch({ type: 'SET_STICKY', value: id }) //` Dispatch Sticky Area for  Cursor
      setTimeout(() => {
        gsap.to(document.getElementById(id), {
          startAt: { y: '-100%' },
          y: '0%',
          ease: Power3.easeOut,
          duration: 0.55,
        })
      }, 0)

      cursor.classList.add('-exclusion', size === 'SMALL' ? '-small' : size === 'MEDIUM' ? '-med' : null) //` Add -exclusion and -med class
    } else if (status === 'END') {
      gsap.to(document.getElementById(id), {
        startAt: { y: '200%', skewY: 7.5 },
        y: '0%',
        skewY: 0,
        ease: Power3.easeOut,
        duration: 0.55,
      })
      cursor.classList.remove('-exclusion', '-small') //` Remove -exclusion and -med class
      dispatch({ type: 'SET_STICKY', value: null }) //` Cleanup
    }
  }
}

//$ 10: Cursor Hovered Underline Expand Collapse Animation
export const CURSOR_UNDERLINE = (state, id) => {
  if (isDesktop) {
    const doc = document.querySelector(id)
    if (state !== 'END') {
      gsap.to(doc, {
        width: '0%',
        duration: 0.75,
        ease: Power3.easeOut,
      })
    } else if (state === 'END') {
      gsap.to(doc, {
        width: '100%',
        duration: 0.75,
        ease: Power3.easeOut,
      })
    }
  }
}

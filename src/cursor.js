import React, { useEffect, useRef, useCallback } from 'react' //` Context API and Hooks
import { gsap, Expo } from 'gsap/dist/gsap.js' //` GSAP Animation Engine
import { SelectCursor } from './actions.js' //` Cursor Data Reducer

//& Cursor
export default function Cursor() {
  //$ References
  const cursorRef = useRef(null) //` Main Cursor Ref
  const textRef = useRef(null) //` Cursor Text Ref
  const videoRef = useRef(null) //` Cursor Video Ref

  if (typeof document === 'undefined') {
    React.useLayoutEffect = React.useEffect
  }

  //$ Global Cursor Actions States
  const { sticky, magnetic, intensity, jelly, text, video } = SelectCursor()

  //$ GSAP 60FPS Ticker Hook
  const useTicker = (callback, paused) => {
    React.useLayoutEffect(() => {
      if (!paused && callback) {
        gsap.ticker.add(callback) //` Run requestAnimationFrame
        gsap.ticker.fps(60) //` at 60FPS Locked
      }
      //@ Cleanup on Exit
      return () => {
        gsap.ticker.remove(callback)
        gsap.ticker.fps(60)
      }
    }, [callback, paused])
  }

  //$ Get Scale and Angle Functions
  //@ Function for Mouse Move Scale Change
  function getScale(diffX, diffY, intensity) {
    const distance = Math.sqrt(Math.pow(diffX, 2) + Math.pow(diffY, 2))
    return Math.min(distance / intensity, 0.35)
  }

  //@ Function For Mouse Movement Angle in Degrees
  function getAngle(diffX, diffY) {
    return (Math.atan2(diffY, diffX) * 180) / Math.PI
  }

  //@ Custom useInstance Hook
  const EMPTY = {}
  const useInstance = (value = {}) => {
    const ref = useRef(EMPTY)
    if (ref.current === EMPTY) {
      ref.current = typeof value === 'function' ? value() : value
    }
    return ref.current
  }

  //$ Animation Variable Declarations
  const pos = useInstance(() => ({ x: 0, y: 0 })) //` Cursor Position
  const vel = useInstance(() => ({ x: 0, y: 0 })) //` Cursor Velocity
  const set = useInstance() //` GSAP Quicksetter Function

  //@ GSAP Quick Setter init
  React.useLayoutEffect(() => {
    set.x = gsap.quickSetter(cursorRef.current, 'x', 'px')
    set.y = gsap.quickSetter(cursorRef.current, 'y', 'px')
    set.r = gsap.quickSetter(cursorRef.current, 'rotate', 'deg')
    set.sx = gsap.quickSetter(cursorRef.current, 'scaleX')
    set.sy = gsap.quickSetter(cursorRef.current, 'scaleY')
    set.rt = gsap.quickSetter(textRef.current, 'rotate', 'deg')
    set.rv = gsap.quickSetter(videoRef.current, 'rotate', 'deg')
  }, [set])

  //& Cursor Animation
  const animation = useCallback(() => {
    //@ Start Animation
    var rotation = getAngle(vel.x, vel.y) //` Cursor Movement Angle
    var scale = getScale(vel.x, vel.y, intensity) //` Cursor Blob Squeeze Amount

    //$ For Sticky Magnetic and Normal Cursor
    if (magnetic || !jelly) {
      //@ Do-While Sticky & Magnetic
      if (magnetic) {
        const target = document.getElementById(magnetic) //` Get Element to Stick
        const bound = target.getBoundingClientRect() //` Get Target Width Height and Other Properties

        const stickX = bound.left + target.offsetWidth / 2 //` Stick X Position
        const stickY = bound.top + target.offsetHeight / 2 //` Stick Y Position

        const snapX = stickX - (stickX - pos.x) * 0.125 //` Move Cursor X while Sticked or Magnetized
        const snapY = stickY - (stickY - pos.y) * 0.125 //` Move Cursor Y while Sticked or Magnetized

        //@ Post Animation to Cursor
        gsap.to(cursorRef.current, {
          x: snapX,
          y: snapY,
          ease: Expo.easeOut,
          duration: 0.55,
        })
      } else {
        //@ Do-While Normal Cursor
        set.x(pos.x)
        set.y(pos.y)
      }
      //@ Set Rotation and Squeeze null
      set.r(0)
      set.sx(1)
      set.sy(1)
      set.rt(0)
    } else {
      //$ For All Other Cursor Scenarios
      set.x(pos.x)
      set.y(pos.y)
      set.r(rotation)
      set.sx(1 + scale)
      set.sy(1 - scale)
      set.rt(-rotation)
      set.rv(-rotation)
    }
  }, [sticky, magnetic, intensity, jelly])

  //& Get Mouse Position
  React.useLayoutEffect(() => {
    const setFromEvent = e => {
      e.preventDefault()

      const x = e.clientX //` Client Mouse X
      const y = e.clientY //` Client Mouse Y

      let snapX = 0 //` Sticky or Magnetic X Amount
      let snapY = 0 //` Sticky or Magnetic Y Amount

      cursorRef.current.classList.remove('-destroyed') //` Show Cursor

      //@ Do-While Sticky or Magnetic
      if (sticky || magnetic) {
        //@ For Sticky Cursor DO-This
        const target = document.getElementById(sticky || magnetic) //` Get Element to Stick
        const bound = target.getBoundingClientRect() //` Get Target Width Height and Other Properties

        const stickX = bound.left + target.offsetWidth / 2 //` Stick X Position
        const stickY = bound.top + target.offsetHeight / 2 //` Stick Y Position

        if (magnetic) {
          snapX = stickX - (stickX - x) * 0.55 //` Move Cursor X while Sticked or Magnetized
          snapY = stickY - (stickY - y) * 0.55 //` Move Cursor Y while Sticked or Magnetized
        }

        //@ For Magnetic Cursor DO-This
        if (sticky) {
          const magX = (x - bound.left - target.offsetWidth / 2) * 0.2 //` Move Magnetic Element X Amount
          const magY = (y - bound.top - target.offsetHeight / 2) * 0.2 //` Move Magnetic Element Y Amount
          //@  Post Magnetic Movement Animation to Element
          gsap.to(target, {
            x: magX,
            y: magY,
            ease: Expo.easeOut,
            duration: 0.35,
          })
        }

        //@ For Magnetic Cursor DO-This
        if (magnetic) {
          const magX = (x - bound.left - target.offsetWidth / 2) * 0.125 //` Move Magnetic Element X Amount
          const magY = (y - bound.top - target.offsetHeight / 2) * 0.125 //` Move Magnetic Element Y Amount
          //@  Post Magnetic Movement Animation to Element
          gsap.to(target, {
            x: magX,
            y: magY,
            ease: Expo.easeOut,
            duration: 0.75,
          })
        }
      }

      //$ Set Main Cursor Position and Velocity
      gsap.to(pos, {
        x: snapX || x,
        y: snapY || y,
        duration: 0.75,
        ease: Expo.easeOut,
        onUpdate: () => {
          vel.x = x - pos.x
          vel.y = y - pos.y
        },
      })

      //@ Run Animation Function
      animation()
    }

    //@ Mouse Move Listeners
    window.addEventListener('mousemove', setFromEvent)
    return () => {
      window.removeEventListener('mousemove', setFromEvent)
    }
  }, [sticky, magnetic])

  //$ Reset Magnetic Fields
  useEffect(() => {
    //@ Do-When Magnetic Element ID Lost
    if (!magnetic && !sticky) {
      //@ Reset All Magnetic Element to Original Position
      document.querySelectorAll('[data-magnetism]').forEach(magItem => {
        //@ Reset Position Animation Data to Element
        gsap.to(magItem, {
          x: 0,
          y: 0,
          ease: Expo.easeOut,
          duration: 0.8,
        })
      })
    }
  }, [magnetic, sticky])

  //$ Run All Animations with 60FPS (Adjust for Higher Refresh Monitors too)
  useTicker(animation)

  //& Cursor UI
  return (
    <div ref={cursorRef} id={'cursor-id'} className={'cursor -hidden -destroyed'}>
      {/* //@ Cursor Jelly Blob Inner Text Play and Close Button  */}
      <div ref={textRef} id={'cursor-text'} className={'cursor-inner-text'}>
        {text === 'CLOSE' || text === 'PLAY' ? <img alt="Cursor" src={`/static/svg/${text}.svg`} priority className="cursor-media-svg" /> : text}
      </div>
      {/* //@ Cursor Jelly Blob Inner Video  */}
      <div ref={videoRef} id={'media-id'} className={'cursor-media'}>
        <video id="video-id" src={video} autoPlay muted loop />
      </div>
    </div>
  )
}

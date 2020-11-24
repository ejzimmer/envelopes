import React, { useEffect } from 'react'
import gsap from 'gsap'
import { useRef } from 'react'
import { useDispatch } from 'react-redux'
import { hideToast } from './Actions'

export default function Toast({message}) {
  const dispatch = useDispatch()
  const timer = useRef()

  useEffect(() => {
    if (!message) return

    clearTimeout(timer.current)
    timer.current = setTimeout(() => dispatch(hideToast()), 8000)

    gsap.timeline().to('.toast', { 
        duration: 1.5,
        bottom: '5vh',
        opacity: 1,
        ease: 'bounce'
      })
      .to('.toast', {
        duration: 1,
        opacity: 0,
        delay: 5
      })
      .to('.toast', {
        bottom: 'calc(100vh + 100%)'
      })
  }, [message, dispatch])

  return (
    <div className="toast">
      <div className="toast-text">{message}</div>
    </div>
  )
}
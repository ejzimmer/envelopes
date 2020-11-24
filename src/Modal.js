import React, { useState } from 'react'
import { useSelector } from 'react-redux'

export default function() {
  const [visible, setVisible] = useState(false)
  const Component = useSelector(state => state.modalComponent)

  if (!visible && !!Component) {
    setVisible(true)
    setTimeout(() => {
      document.querySelector('.modal input').focus()
    })
  }

  if (visible && !Component) {
    setVisible(false)
  }

return <div className={`modal ${visible ? 'visible' : ''}`}>{Component && <Component />}</div>
}
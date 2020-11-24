import React, { useState, useRef } from 'react'

export function useAmiibo() {
  const [amiibo, setAmiibo] = useState()
  fetch('url')
    .then(response => response.json())
    .then(json => setAmiibo(json))

  return amiibo
}

export function ShowAmiibo({ name }) {
  const amiibo = useAmiibo(name)
  return amiibo && <img src={amiibo.image} alt={name} /> || null
}
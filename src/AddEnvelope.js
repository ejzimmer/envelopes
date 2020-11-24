import React from 'react'
import { useDispatch } from 'react-redux'
import AddEnvelopeForm from './AddEnvelopeForm'
import { showModal } from './Actions'

export default function AddEnvelope() {
  const dispatch = useDispatch()

  const openModal = () => {
    dispatch(showModal(AddEnvelopeForm))
  }

  return (
      <button className="btn-large" onClick={openModal}>Add Envelope</button>
  )
}
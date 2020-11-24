import React, { useRef } from 'react'
import ScheduleTransactionForm from './ScheduleTransactionsForm'
import { useDispatch } from 'react-redux'
import { addEnvelope, hideModal } from './Actions';

const getTransactionValues = (form, transactionType) => {
  return {
    start: form[`${transactionType}_start`].value,
    frequency: form[`${transactionType}_frequency`].value,
    amount: form[`${transactionType}_amount`].value
  }
}

const hasValues = (transaction) => transaction.start && transaction.frequency && transaction.amount

export default function() {
  const dispatch = useDispatch()
  const name = useRef()

  const createEnvelope = (event) => {
    event.preventDefault()

    const form = event.target
    const { name, colour } = form
    const deposits = getTransactionValues(form, 'deposit')
    const withdrawals = getTransactionValues(form, 'withdrawal')

    const envelope = {
      name: name.value,
      colour: colour.value,
    }

    if (hasValues(deposits)) {
      envelope.scheduled_deposits = deposits
    }

    if (hasValues(withdrawals)) {
      envelope.scheduled_withdrawals = withdrawals
    }
    dispatch(addEnvelope(envelope))
    closeModal()
  }

  const closeModal = () => {
    dispatch(hideModal())
  }

  return  (
  <form onSubmit={createEnvelope}>
    <fieldset>
      <legend>Envelope details</legend>
      <label htmlFor="name">Name</label>
      <input id="name" type="text" ref={name} />
      <label htmlFor="colour">Colour</label>
      <input id="colour" type="color"></input>
    </fieldset>
    <ScheduleTransactionForm type="DEPOSIT" />
    <ScheduleTransactionForm type="WITHDRAWAL" />
    <div className="action-buttons">
      <button>Save</button>
      <button className="btn-cancel" onClick={closeModal}>Cancel</button>
    </div>
  </form> 
  )
}
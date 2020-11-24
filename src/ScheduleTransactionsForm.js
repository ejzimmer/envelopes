import React from 'react'

const types = {
  DEPOSIT: {
    heading: 'Deposits',
    id: 'deposit'
  },
  WITHDRAWAL:{
    heading: 'Withdrawals',
    id: 'withdrawal'
  }
}

export default function ScheduleTransactionsForm({type}) {

  const { heading, id } = types[type]

  return (
    <fieldset id={id}>
      <legend>{heading}</legend>
      <label htmlFor={`${id}_start`}>Start</label>
      <input type="date" id={`${id}_start`}></input>

      <label htmlFor={`${id}_frequency`}>Frequency</label>
      <select id={`${id}_frequency`}>
        <option value="weeks">Weekly</option>
        <option value="months">Monthly</option>
        <option value="years">Annually</option>
        <option value="once">Once</option>
      </select>

      <label htmlFor={`${id}_amount`}>Amount</label>
      <input type="number" id={`${id}_amount`} step="0.01"></input>
    </fieldset>
  )
}
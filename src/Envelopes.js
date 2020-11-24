import React, { useState } from 'react'
import Graph from './Graph'

export default function Envelopes({ envelopes }) {
  const [selectedEnvelopes, setSelectedEnvelopes] = useState([])

  const updateEnvelopes = (event, envelope) => {
    if (event.target.checked) {
      setSelectedEnvelopes(envelopes => [...envelopes, envelope])
    } else {
      setSelectedEnvelopes(envelopes => envelopes.filter(({name}) => name !== envelope.name))
    }
  }

  return (
    <div className="envelopes" style={{display: 'flex', flexDirection: 'column'}}>
      <ul className="select-envelopes">
        {envelopes.map(envelope => (
          <li key={envelope.name} style={{'--envelope-colour': envelope.colour}}>
            <input type="checkbox" id={`env_${envelope.name}`} onChange={(event) => updateEnvelopes(event, envelope)} />
            <label htmlFor={`env_${envelope.name}`}>
        {envelope.name} {envelope.balance < 0 ? '-' : ''}${Math.abs(envelope.balance).toFixed(2)}
            </label>
          </li>
        ))}
      </ul>
      <div className="transactions">
        <Graph envelopes={selectedEnvelopes} />
      </div>
    </div>
  )
}

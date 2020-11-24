import React from 'react';
import { useSelector } from 'react-redux';

import './App.css';

import Modal from './Modal'
import Envelopes from './Envelopes'
import AddEnvelope from './AddEnvelope'
import Toast from './Toast'
import { signInWithGoogle } from '.'

function App() {
  const envelopes = useSelector(state => state.envelopes)
  const toastMessage = useSelector(state => state.toastMessage)
  const user = useSelector(state => state.user)

  const isEnvelopes = envelopes && envelopes.length > 0
  
  return (
    <main>
      <Modal />
      {!user && <button className="login" onClick={signInWithGoogle}>log in with Google</button>}
      {user && !isEnvelopes && <div style={{marginBottom: '40px'}}>Look, you're probably not allowed to see this data</div>}
      {isEnvelopes && <Envelopes envelopes={envelopes} />}
      <AddEnvelope />
      <Toast message={toastMessage} />
    </main>
  );
}

export default App;

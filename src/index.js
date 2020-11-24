import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { Provider } from 'react-redux'
import { reducer, updateBalances } from './reducer'
import firebase from 'firebase'
import { createStore } from 'redux'
import { setInitialState, setUser } from './Actions'

const FIREBASE_CONFIG = {
  apiKey: "AIzaSyApzgVOg1Ku4Mned3xoMxFIZtBvyAeQXn0",
  authDomain: "envelopes-b0842.firebaseapp.com",
  databaseURL: "https://envelopes-b0842.firebaseio.com",
  projectId: "envelopes-b0842",
  storageBucket: "envelopes-b0842.appspot.com",
  messagingSenderId: "1074504024896",
  appId: "1:1074504024896:web:8915b1508f75442b2330a5"
};
firebase.initializeApp(FIREBASE_CONFIG);
const databaseRef = firebase.database().ref()
export const envelopes = databaseRef.child('envelopes')

const store = createStore(reducer, { envelopes: [] })

databaseRef.once('value', (initial) => {
  const fetchedValue = initial.val()
  const envelopesWithBalances = updateBalances(fetchedValue.envelopes)
  fetchedValue && store.dispatch(setInitialState({ envelopes: envelopesWithBalances }))
  store.subscribe(() => {
    envelopes.set(store.getState().envelopes);
  })  
})

const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();
export const signInWithGoogle = () => auth.signInWithPopup(provider);

auth.onAuthStateChanged(user => {
  if (user) {
    store.dispatch(setUser(user))
  }
})


ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();


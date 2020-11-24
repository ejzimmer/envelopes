export const SET_INITIAL_STATE_ACTION = 'Initial state'
export const ADD_ENVELOPE_ACTION = 'Add envelope'
export const OPEN_MODAL_ACTION = 'Open modal'
export const CLOSE_MODAL_ACTION = 'Close modal'
export const HIDE_TOAST_ACTION = 'Hide toast'
export const SET_USER_ACTION = 'Set user'

export function setInitialState(state) {
  return {
    type: SET_INITIAL_STATE_ACTION,
    state
  }
}

export function setUser(user) {
  return {
    type: SET_USER_ACTION,
    user
  }
}

export function addEnvelope(envelope) {
  return {
    type: ADD_ENVELOPE_ACTION,
    envelope
  }
}

export function showModal(component) {
  return {
    type: OPEN_MODAL_ACTION,
    component
  }
}

export function hideModal() {
  return {
    type: CLOSE_MODAL_ACTION,
  }
}

export function hideToast() {
  return {
    type: HIDE_TOAST_ACTION
  }
}
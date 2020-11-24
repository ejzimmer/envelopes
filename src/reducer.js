import { ADD_ENVELOPE_ACTION, OPEN_MODAL_ACTION, CLOSE_MODAL_ACTION, HIDE_TOAST_ACTION, SET_INITIAL_STATE_ACTION, SET_USER_ACTION } from './Actions'
import { parse } from 'date-fns'
import add  from 'date-fns/add'
import isFuture from 'date-fns/isFuture'

export function reducer(state = {}, action) {
  switch (action.type) {
    case SET_INITIAL_STATE_ACTION:
      return {
        ...action.state,
        user: state.user
      }
    case SET_USER_ACTION:
      return {
        ...state,
        user: action.user
      }
    case ADD_ENVELOPE_ACTION:
      const envelopes = [...state.envelopes, action.envelope]
      return { ...state, envelopes: updateBalances(envelopes), toastMessage: `${action.envelope.name} added.` }
    case OPEN_MODAL_ACTION:
      return { ...state, modalComponent: action.component }
    case CLOSE_MODAL_ACTION:
      return { ...state, modalComponent: undefined }
    case HIDE_TOAST_ACTION:
      return { ...state, toastMessage: '' }
    default:
      return state
  }
}

export function updateBalances(fetchedEnvelopes) {
  const envelopes = Object.entries(fetchedEnvelopes).map(([index, envelope]) => ({ index, ...envelope }))

  envelopes.forEach(envelope => {
    const credits = processTransactions(envelope.scheduled_deposits)
    const debits = processTransactions(envelope.scheduled_withdrawals, -1)

    const transactions = [...credits, ...debits].sort((a, b) => a.date - b.date)
    transactions.forEach((transaction, index) => {
      if (index === 0) {
        transaction.balance = transaction.amount
      } else {
        transaction.balance = transactions[index - 1].balance + transaction.amount
      }

    })

    const balance = transactions.reduce((total, current) => total += current.amount, 0)

    envelope.transactions = transactions
    envelope.balance = balance
  })

  return envelopes
}

function processTransactions(schedule, modifier = 1) {
  const transactions = []

  if (!schedule) return transactions

  const startDate = parse(schedule.start, 'yyyy-MM-dd', new Date())
  const amount = Number.parseFloat(schedule.amount) * modifier

  if (schedule.frequency === 'once') {
    transactions.push({
      date: startDate,
      amount: amount
    })
    return transactions
  }

  const frequency = { [schedule.frequency]: 1 }
  for (let date = startDate; !isFuture(date); date = add(date, frequency)) {
    transactions.push({ date, amount })
  }
  return transactions
}

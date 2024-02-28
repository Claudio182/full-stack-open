import deepFreeze from 'deep-freeze'
import counterReducer from './reducer'

describe('unicafe reducer', () => {
  const initialState = {
    good: 0,
    ok: 0,
    bad: 0
  }

  test('should return a proper initial state when called with undefined state', () => {
    const state = {}
    const action = {
      type: 'DO_NOTHING'
    }
    const newState = counterReducer(undefined, action)
    deepFreeze(newState)
    expect(newState).toEqual(initialState)
  })

  test('good is incremented', () => {
    const action = {
      type: 'GOOD'
    }

    deepFreeze(initialState)
    const newState = counterReducer(initialState, action)

    expect(newState).toEqual({
      good: 1,
      ok: 0,
      bad: 0
    })
  })

  test ('ok is increment', () => {
    const action = {
      type: 'OK'
    }

    const newState = counterReducer( initialState, action)

    expect(newState).toEqual({
      good: 0,
      ok: 1,
      bad: 0
    })
  })

  test('bad increment', () => {
    const action = {
      type: 'BAD'
    }

    const newState = counterReducer(initialState, action )

    expect(newState).toEqual({
      good: 0,
      ok: 0,
      bad: 1
    })
  })

  test('zero', () => {
    const action = {
      type: 'ZERO'
    }

    const newState = counterReducer(initialState, action )

    expect(newState).toEqual({
      good: 0,
      ok: 0,
      bad: 0
    })
  })
})
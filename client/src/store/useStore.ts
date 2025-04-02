import {configureStore} from '@reduxjs/toolkit'
import {rootReducer} from './rootReducer'
import {useMemo} from 'react'
import {logger} from 'redux-logger'
import {thunk} from 'redux-thunk'

const useLogger = process.env.NODE_ENV !== 'production'

const initializeStore = () => {
  const middlewares :any[] = [thunk]
  if (useLogger) {
    middlewares.push(logger)
  }

  return configureStore({
    reducer: rootReducer,
    middleware: getDefaultMiddleware => getDefaultMiddleware().concat(middlewares)
  })
}

export function useStore() {
  return useMemo(() => initializeStore(), [])
}

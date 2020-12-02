import {combineReducers, createStore} from 'redux'
import {persistStore, persistReducer} from 'redux-persist'
import storage from 'redux-persist/lib/storage'

// ---------------------------------------------------------------------------- Reducers Imports

import authReducer from './authReducer'

// ---------------------------------------------------------------------------- Config

const allReducers = combineReducers({
	auth: authReducer
})
const persistConfig = {
	key: 'root',
	storage,
	whitelist: ['auth']
}
const allPersistReducers = persistReducer(persistConfig, allReducers)

// ----------------------------------------------------------------------------

export const reduxStore = createStore(allPersistReducers)
export const reduxPersistStore = persistStore(reduxStore)
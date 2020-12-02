import React from 'react'
import {render} from 'react-dom'
import App from './components/App'
import {Provider} from 'react-redux'
import {PersistGate} from 'redux-persist/integration/react'
import {reduxStore, reduxPersistStore} from './reducers'

render(
	<Provider store={reduxStore}>
		<PersistGate persistor={reduxPersistStore}>
			<App />
		</PersistGate>
	</Provider>,
	document.getElementById('Alkemy')
)
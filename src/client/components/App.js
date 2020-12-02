import React, {useEffect} from 'react'
import {HashRouter, Switch, Route} from 'react-router-dom'

// ---------------------------------------------------------------------- Redux Imports

import {useSelector, useDispatch} from 'react-redux'
// Actions
import loadUser from '../actions/LoadUser'

// ---------------------------------------------------------------------- Components/Pages

import NavBar from './NavBar'
import ProtectedRoute from './ProtectedRoute'
import Home from './pages/Home'
import NotFound from './pages/NotFound'
import Login from './pages/Login'
import Register from './pages/Register'
import Operation from './pages/operations/Operation'
import List from './pages/operations/List'
import Profile from './pages/profile/Profile'

// ---------------------------------------------------------------------- Main App

export default function App(props) {
	const dispatch = useDispatch()
	useEffect(()=>{loadUser(dispatch)},[])
	const auth = useSelector(state => state.auth)

// ---------------------------------------------------------------------- render

	return(
		<HashRouter>
			<div style={styles.mainContainer}>
				<NavBar />
				<div style={styles.bodyContainer}>
					<Switch>
						<Route path='/' exact component={Home} />
						<Route path='/login' exact component={Login} />
						<Route path='/register' exact component={Register} />
						<ProtectedRoute path='/operations' exact component={Operation} />
						<ProtectedRoute path='/operations/list' exact component={List} />
						<ProtectedRoute path='/user/profile' exact component={Profile} />
						<Route path='*' component={NotFound} />
					</Switch>
				</div>
			</div>
		</HashRouter>
	)
}

// ---------------------------------------------------------------------- styles

const styles = {
	mainContainer: {
		display: 'row',
		backgroundColor: '#C4C4C4aa'
	},
	bodyContainer: {
		display: 'flex',
		width: '100%',
		minHeight: '88vh',
	}
}
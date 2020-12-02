import React from "react"
import {Route, Redirect} from "react-router-dom"
import {useSelector} from "react-redux"

const ProtectedRoute = ({component: Component, ...rest}) => {
	const isLogged = useSelector(state => state.auth.isLogged)
	if (isLogged) {
		return <Route {...rest} render={
			(props) => {
				return <Component {...props} />
			}
		} />
	}
	else {
		return <Redirect to="/loggin" />
	}
}
export default ProtectedRoute
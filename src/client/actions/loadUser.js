import {serverIP, serverPORT} from '../ipConfig'

export default function loadUser(dispatch) {
	dispatch({type: 'Loading'})
	fetch(`http://${serverIP}:${serverPORT}/users/logstatus`)
	.then(res => res.json())
	.then(data => {
		if (data.body.usrLogged) {
	 		dispatch({
	 			type: 'Loaded',
	 			user: data.body.userProps
	 		})
	 	}
	 	else {
	 		dispatch({type: 'SignOut'})
	 	}
	})
	.catch(err => console.error(err))
}
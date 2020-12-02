import React, {useState} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {Redirect} from 'react-router-dom'
import {serverIP, serverPORT} from '../../ipConfig'
import loadUser from '../../actions/LoadUser'

export default function Login(props) {
	const dispatch = useDispatch()
	const isLogged = useSelector(state => state.auth.isLogged)
	const [userState, setUserState] = useState({
		email: 'user1@gmail.com',
		pass: '123456'
	})
	const [wrongState, setWrongState] = useState({
		email_text: '',
		pass_text: ''
	})

// ---------------------------------------------------------------------------------- handleLogginUser()

	function handleLogginUser() {
		fetch(`http://${serverIP}:${serverPORT}/users/login`,{
		method: 'post',
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({
			email: userState.email,
			password: userState.pass
		})
		})
		.then(res => res.json())
		.then(data => {
			if (!data.body.wrongData && data.body.usrLogged) {
				setUserState({email: '', pass: ''})
				setWrongState({email_text: '', pass_text: ''})
				loadUser(dispatch)
				props.history.push('/')
			}
			else {
				setUserState({...userState, pass: ''})
				setWrongState({...wrongState, pass_text: 'E-mail o Password incorrectos...'})
			}
		})
		.catch(err => console.error(err))
	}

// ---------------------------------------------------------------------------------- inputsValidate()

	function inputsValidate() {
		const emailExpression = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/
		const emailResult = emailExpression.test(userState.email)
		if (emailResult) {
			handleLogginUser()
		}
		else {
			setWrongState({...wrongState, email_text: 'E-mail no valido...'})
		}
	}

// ---------------------------------------------------------------------- render

	return(
		<div style={styles.container}>
			{isLogged
			?
			<Redirect to='/' />
			:
			<div style={styles.frameStyle}>
				<div style={{display: 'flex', justifyContent: 'center', margin: '0 0 4vh 0'}}>
					<p style={{margin: '0 0 0 0', padding: '0 0 0 0', fontSize: '6vh'}}>Loguearse</p>
				</div>
				<p style={styles.titleStyle}>E-mail:</p>
				<div style={{display: 'flex', margin: '0 0 1.5vh 0', alignItems: 'center'}}>
					<input
						type='text'
						placeholder='ejemplo@gmail.com'
						value={userState.email}
						onChange={e => setUserState({...userState, email: e.target.value})}
						style={wrongState.email_text !== '' ? styles.inputStyle1 : styles.inputStyle}
					/>
				</div>
				{wrongState.email_text !== '' ? <p style={styles.wrongTextStyle}>{wrongState.email_text}</p> : null}
				<p style={styles.titleStyle}>Contraseña</p>
				<div style={{display: 'flex', margin: '0vh 0 1vh 0', alignItems: 'center'}}>
					<input
						type='password'
						placeholder='contraseña'
						value={userState.pass}
						onChange={e => setUserState({...userState, pass: e.target.value})}
						style={wrongState.pass_text !== '' ? styles.inputStyle1 : styles.inputStyle}
					/>
				</div>
				{wrongState.pass_text !== '' ? <p style={styles.wrongTextStyle}>{wrongState.pass_text}</p> : null}
				<div style={{display: 'flex', justifyContent: 'center', margin: '3vh 0 0 0'}}>
				{(wrongState.email_text === '' && wrongState.pass_text === '')
					? <button onClick={()=>inputsValidate()} style={styles.btnStyle}>Loguear</button>
					: <button onClick={()=>setWrongState({email_text: '', pass_text: ''})} style={styles.wrongBtnStyle}>OK!</button>
				}
				</div>
			</div>
			}
		</div>
	)
}

// ---------------------------------------------------------------------- styles

const styles = {
	container: {
		display: 'flex',
		width: '100%',
		justifyContent: 'center',
		margin: '10vh 0 0 0'
	},
	frameStyle: {
		display: 'row',
		margin: '1.5vh 0 0 4vw'
	},
	titleStyle: {
		margin: '4vh 0 0 0',
		padding: '0 0 0 0',
		fontSize: '4vh'
	},
	inputStyle: {
		display: 'flex',
		textAlign: 'center',
		padding: '0.8vh 0 0.5vh 0',
		borderRadius: '1.5vh',
		border: 'none',
		fontSize: '2.5vh',
		width: '30vw'
	},
	inputStyle1: {
		display: 'flex',
		textAlign: 'center',
		padding: '0.8vh 0 0.5vh 0',
		borderRadius: '1.5vh',
		border: 'none',
		fontSize: '2.5vh',
		width: '30vw',
		backgroundColor: '#F78E8E'
	},
	wrongTextStyle: {
		margin: '0 0 0 1.5vw',
		padding: '0 0 0 0',
		color: 'red',
		fontSize: '3vh'
	},
	btnStyle: {
		padding: '0.5vh 0.5vw 0.5vh 0.5vw',
		border: '0.8vh double #6AD478',
		color: '#6AD478',
		backgroundColor: '#929292',
		borderRadius: '1vh',
		fontSize: '2.8vh',
		cursor: 'pointer'
	},
	wrongBtnStyle: {
		padding: '0.5vh 0.5vw 0.5vh 0.5vw',
		border: '0.8vh double #E44D4D',
		color: '#E44D4D',
		backgroundColor: '#929292',
		borderRadius: '1vh',
		fontSize: '2.8vh',
		cursor: 'pointer'
	}
}
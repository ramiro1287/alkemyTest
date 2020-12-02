import React, {useState} from 'react'
import {Link, withRouter} from 'react-router-dom'
import {useSelector, useDispatch} from 'react-redux'
import {serverIP, serverPORT} from '../ipConfig'

function NavBar(props) {
	const dispatch = useDispatch()
	const auth = useSelector(state => state.auth)
	const [mouseStyle, setMouseStyle] = useState('')
	const [toggleMenu, setToggleMenu] = useState(false)

// ---------------------------------------------------------------------- handleSignOut()

	function handleSignOut() {
		fetch(`http://${serverIP}:${serverPORT}/users/logout`)
		.then(() => {
			setToggleMenu(false)
			dispatch({type: 'SignOut'})
			props.history.push('/')
		})
		.catch(err => console.error(err))
	}

// ---------------------------------------------------------------------- render

	return(
		<div style={styles.navContainer}>
			<Link to='/' title='Pagina Principal' style={{display: 'flex', alignSelf: 'center', margin: '1vh 0 1vh 3vw', textDecoration: 'none', color: 'green'}}>
				<h1 style={{margin: '0 0 0 0', padding: '0 0 0 0', color: 'black', fontSize: '8vh'}}>Alkemy</h1>
			</Link>
			{auth.isLogged ? null
				:
				<div style={{display: 'flex', alignItems: 'flex-end', margin: '0 3vw 1vh 0'}}>
					<Link
						to='/login'
						onMouseOut={()=>setMouseStyle('')}
						onMouseOver={()=>setMouseStyle('/login')}
						title='Loguearse'
						style={props.history.location.pathname==='/login' ? styles.linkStyle2 : mouseStyle==='/login' ? styles.linkStyle1 : styles.linkStyle}
					>Loguearse</Link>
					<Link
						to='/register'
						onMouseOut={()=>setMouseStyle('')}
						onMouseOver={()=>setMouseStyle('/register')}
						title='Registrarse'
						style={props.history.location.pathname==='/register' ? styles.linkStyle2 : mouseStyle==='/register' ? styles.linkStyle1 : styles.linkStyle}
					>Registrarse</Link>
				</div>
			}
			{auth.isLogged
				?
				<div style={{display: 'flex', alignItems: 'flex-end', margin: '0 0 1vh 0'}}>
					<Link
						to='/operations/list'
						onMouseOut={()=>setMouseStyle('')}
						onMouseOver={()=>setMouseStyle('/operations/list')}
						title='Lista de operaciones'
						style={props.history.location.pathname==='/operations/list' ? styles.linkStyle2 : mouseStyle==='/operations/list' ? styles.linkStyle1 : styles.linkStyle}
					>Lista</Link>
					<Link
						to='/operations'
						onMouseOut={()=>setMouseStyle('')}
						onMouseOver={()=>setMouseStyle('/operations')}
						title='Operaciones'
						style={props.history.location.pathname==='/operations' ? styles.linkStyle2 : mouseStyle==='/operations' ? styles.linkStyle1 : styles.linkStyle}
					>Nueva Operacion</Link>
				</div>
				: null
			}
			{auth.isLogged
				?
				<div onClick={()=>{setToggleMenu(!toggleMenu)}} title='Menu' style={styles.menuStyle}>
					<img src={auth.user ? `/uploads/${auth.user.avatar}` : '/uploads/defaultAvatar.png'} style={{height: '9vh', borderRadius: '50%', cursor: 'pointer'}} />
				</div>
				: null
			}
			{toggleMenu
				?
				<div style={styles.toggleMenuStyle}>
					<Link to='/user/profile' title='Perfil' onClick={()=>setToggleMenu(false)} style={styles.menuLinkStyle}>
						<img src='/icons/Profile-Icon.png' style={{height: '3vh', margin: '0.3vh 1vw 0.3vh 0.8vw'}} />
						Perfil
					</Link>
					<Link to='#' title='Sign-Out' onClick={()=>handleSignOut()} style={styles.menuLinkStyle}>
						<img src='/icons/Exit-Icon.png' style={{height: '3vh', margin: '0.3vh 1vw 0.3vh 0.8vw'}} />
						Desloguear
					</Link>
				</div>
				: null
			}
		</div>
	)
}
export default withRouter(NavBar)

// ---------------------------------------------------------------------- styles

const styles = {
	navContainer: {
		display: 'flex',
		backgroundColor: '#5CBFC3',
		justifyContent: 'space-between',
		height: '12vh',
		boxShadow: '0 4px 8px #7A7A7Aaa'
	},
	linkStyle: {
		margin: '0 0 0 1vw',
		textDecoration: 'none',
		color: 'black',
		padding: '0.5vh 0.8vw 0.7vh 0.8vw',
		borderRadius: '2vw',
		fontSize: '3vh'
	},
	linkStyle1: {
		margin: '0 0 0 1vw',
		textDecoration: 'none',
		backgroundColor: '#585858aa',
		color: 'black',
		padding: '0.5vh 0.8vw 0.7vh 0.8vw',
		borderRadius: '2vw',
		fontSize: '3vh'
	},
	linkStyle2: {
		margin: '0 0 0 1vw',
		textDecoration: 'none',
		color: 'white',
		borderBottom: '0.7vh solid white',
		backgroundColor: '#585858aa',
		padding: '0.5vh 0.8vw 0.7vh 0.8vw',
		borderRadius: '2vw',
		fontSize: '3vh'
	},
	menuStyle: {
		display: 'flex',
		alignItems: 'center',
		margin: '0 3vw 0 0',
	},
	toggleMenuStyle: {
		position: 'absolute',
		top: '11vh',
		right: '3vw',
		width: '15vw',
		height: 'auto',
		overflow: 'hidden',
		backgroundColor: '#2F2F2F',
		borderRadius: 15
	},
	menuLinkStyle: {
		display: 'flex',
		textDecoration: 'none',
		color: 'white',
		margin: '1.5vh 2vw 1.5vh 2vw',
		backgroundColor: '#6C6C6Caa',
		borderRadius: 8
	}
}
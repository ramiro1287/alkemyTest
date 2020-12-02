import React, {useState} from 'react'
import {useSelector} from 'react-redux'
import {serverIP, serverPORT} from '../../../ipConfig'
 
export default function Operation() {
	const user = useSelector(state => state.auth.user)
	const [operationState, setOperationState] = useState({
		tipo: false,
		monto: '',
		concepto: '',
		categoria: 'X',
		opState: false
	})
	const [wrongState, setWrongState] = useState({
		monto_text: '',
		concepto_text: ''
	})

// ---------------------------------------------------------------------- handleFetch()

	function handleFetch() {
		fetch(`http://${serverIP}:${serverPORT}/operations/create`,{
			'method': 'post',
			'headers': {
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				usrID: user.email,
				tipo: operationState.tipo,
				monto: operationState.monto,
				concepto: operationState.concepto,
				categoria: operationState.categoria
			})
		})
		.then(res => res.json())
		.then(data => {
			if(data.body.status === 'Creado') {
				setOperationState({
					tipo: false,
					monto: '',
					concepto: '',
					categoria: 'X',
					opState: true
				})
			}
			else {
				setWrongState({
					monto_text: 'Error, intentelo nuevamente...',
					concepto_text: 'Error, intentelo nuevamente...'
				})
				setOperationState({
					tipo: false,
					monto: '',
					concepto: '',
					categoria: 'X',
					opState: false
				})
			}
		})
		.catch(err => console.error(err))
	}

// ---------------------------------------------------------------------- inputsValidate()

	function inputsValidate() {
		if (Number(operationState.monto) && (operationState.monto > 0)) {
			if (Number(operationState.concepto) && (operationState.concepto > operationState.monto)) {
				handleFetch()
			}
			else {
				setWrongState({...wrongState, concepto_text: 'Concepto invalido...'})
			}
		}
		else {
			setWrongState({...wrongState, monto_text: 'Monto invalido...'})
		}
	}

// ---------------------------------------------------------------------- render

	return(
		<div style={styles.container}>
			<div style={styles.frameStyle}>
			{operationState.opState ?
				<div style={{display: 'flex', justifyContent: 'center'}}>
					<p style={styles.opStateStyle}>Operacion agregada...</p>
					<button onClick={()=>setOperationState({...operationState, opState: false})} style={styles.btnStyle}>OK!</button>
				</div> : null}
				<p style={styles.titleStyle}>Tipo de operacion:</p>
				<div style={{display: 'flex', margin: '0 0 1.5vh 0', alignItems: 'center', justifyContent: 'center'}}>
					<button onClick={()=>setOperationState({...operationState, tipo: true})} style={operationState.tipo ? styles.btnTipoStyle : styles.btnTipoStyle1}>Ingreso</button>
					<button onClick={()=>setOperationState({...operationState, tipo: false})} style={!operationState.tipo ? styles.btnTipoStyle : styles.btnTipoStyle1}>Egreso</button>
				</div>
				<p style={styles.titleStyle}>Monto:</p>
				<div style={{display: 'flex', margin: '0 0 1.5vh 0', alignItems: 'center'}}>
					<input
						type='text'
						placeholder='Ingrese monto...'
						value={operationState.monto}
						onChange={e => setOperationState({...operationState, monto: e.target.value})}
						style={wrongState.monto_text !== '' ? styles.inputStyle1 : styles.inputStyle}
					/>
				</div>
				{wrongState.monto_text !== '' ? <p style={styles.wrongTextStyle}>{wrongState.monto_text}</p> : null}
				<p style={styles.titleStyle}>Concepto:</p>
				<div style={{display: 'flex', margin: '0 0 1.5vh 0', alignItems: 'center'}}>
					<input
						type='text'
						placeholder='Ingrese concepto...'
						value={operationState.concepto}
						onChange={e => setOperationState({...operationState, concepto: e.target.value})}
						style={wrongState.concepto_text !== '' ? styles.inputStyle1 : styles.inputStyle}
					/>
				</div>
				{wrongState.concepto_text !== '' ? <p style={styles.wrongTextStyle}>{wrongState.concepto_text}</p> : null}
				<p style={styles.titleStyle}>Categoria:</p>
				<div style={{display: 'flex', margin: '0 0 1.5vh 0', alignItems: 'center'}}>
					<button onClick={()=>setOperationState({...operationState, categoria: 'X'})} style={operationState.categoria === 'X' ? styles.btnTipoStyle : styles.btnTipoStyle1}> X </button>
					<button onClick={()=>setOperationState({...operationState, categoria: 'Y'})} style={operationState.categoria === 'Y' ? styles.btnTipoStyle : styles.btnTipoStyle1}> Y </button>
					<button onClick={()=>setOperationState({...operationState, categoria: 'Z'})} style={operationState.categoria === 'Z' ? styles.btnTipoStyle : styles.btnTipoStyle1}> Z </button>
				</div>
				<div style={{display: 'flex', justifyContent: 'center', margin: '3vh 0 0 0'}}>
				{(wrongState.monto_text === '' && wrongState.concepto_text === '')
					? <button onClick={()=>inputsValidate()} style={styles.btnStyle}>Agregar Operacion</button>
					: <button onClick={()=>setWrongState({monto_text: '', concepto_text: ''})} style={styles.wrongBtnStyle}>OK!</button>
				}
				</div>
			</div>
		</div>
	)
}

// ---------------------------------------------------------------------- styles

const styles = {
	container: {
		display: 'flex',
		width: '100%',
		justifyContent: 'center'
	},
	frameStyle: {
		display: 'row',
		margin: '5vh 0 0 4vh'
	},
	titleStyle: {
		margin: '4vh 0 0 0',
		padding: '0 0 0 0',
		fontSize: '3.5vh'
	},
	btnTipoStyle: {
		margin: '1vh 1vw 0 1vw',
		padding: '0.5vh 0.5vw 0.7vh 0.5vw',
		border: '0.3vh solid green',
		borderRadius: '1vh',
		color: 'green',
		backgroundColor: '#898989aa',
		cursor: 'pointer'
	},
	btnTipoStyle1: {
		margin: '1vh 1vw 0 1vw',
		padding: '0.5vh 0.5vw 0.7vh 0.5vw',
		border: '0.3vh solid red',
		borderRadius: '1vh',
		color: 'red',
		backgroundColor: '#898989aa',
		cursor: 'pointer'
	},
	inputStyle: {
		display: 'flex',
		textAlign: 'center',
		padding: '0.8vh 0 0.5vh 0',
		borderRadius: '1.5vh',
		border: 'none',
		fontSize: '2.5vh',
		width: '15vw'
	},
	inputStyle1: {
		display: 'flex',
		textAlign: 'center',
		padding: '0.8vh 0 0.5vh 0',
		borderRadius: '1.5vh',
		border: 'none',
		fontSize: '2.5vh',
		width: '15vw',
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
		border: '0.5vh dotted #6AD478',
		color: '#6AD478',
		borderRadius: '1vh',
		fontSize: '2vh',
		cursor: 'pointer',
		backgroundColor: '#A4A4A4'
	},
	wrongBtnStyle: {
		padding: '0.5vh 0.5vw 0.5vh 0.5vw',
		border: '0.5vh dotted #E44D4D',
		color: '#E44D4D',
		borderRadius: '1vh',
		fontSize: '2vh',
		cursor: 'pointer',
		backgroundColor: '#A4A4A4'
	},
	opStateStyle: {
		margin: '2vh 0 0 0',
		padding: '0 0 0 0',
		color: 'green',
		fontSize: '3vh'
	}
}
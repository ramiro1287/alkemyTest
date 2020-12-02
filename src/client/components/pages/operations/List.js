import React, {useState, useEffect} from 'react'
import {serverIP, serverPORT} from '../../../ipConfig'
import moment from 'moment'
import EditOP from './EditOP'

export default function List() {
	const [filter, setFilter] = useState({
		tipo: false,
		categoria: ''
	})
	const [operations, setOperations] = useState([])
	const [selectedOP, setSelectedOP] = useState(null)
	useEffect(()=>{loadOperations()},[])
	useEffect(()=>{loadOperations()},[filter])

// ---------------------------------------------------------------------- loadOperations()

	function loadOperations() {
		fetch(`http://${serverIP}:${serverPORT}/operations/list`,{
			'method': 'post',
			'headers': {
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(filter)
		})
		.then(res => res.json())
		.then(data => {
			if (data.body.status === 'OK') {
				var len = (data.body.operaciones).length
				var arr = []
				for (var i=0; i<len; i++) {
					if (i===10) {break}
					arr.push(data.body.operaciones[i])
				}
				setOperations(arr)
			}
			else {
				console.log(data.body.status)
			}
		})
		.catch(err => console.error(err))
	}

// ---------------------------------------------------------------------- render

	return(
		<div style={styles.container}>
			{selectedOP ? <EditOP selectedOP={selectedOP} setSelectedOP={setSelectedOP}/>
			:
			<div style={{display:'flex', width: '100%'}}>
				<div style={styles.filterFrameStyle}>
					<div style={{display: 'flex', justifyContent: 'center', margin: '1.5vh 0 0 0'}}>
						<button onClick={()=>setFilter({...filter, tipo: !filter.tipo})} style={filter.tipo ? styles.btnTipoStyle : styles.btnTipoStyle1}>Ingreso</button>
						<button onClick={()=>setFilter({...filter, tipo: !filter.tipo})} style={!filter.tipo ? styles.btnTipoStyle : styles.btnTipoStyle1}>Egreso</button>
					</div>
					<div style={{display: 'flex', justifyContent: 'center'}}>
						<button onClick={()=>setFilter({...filter, categoria: ''})} style={filter.categoria === '' ? styles.btnTipoStyle : styles.btnTipoStyle1}>Todos</button>
						<button onClick={()=>setFilter({...filter, categoria: 'X'})} style={filter.categoria === 'X' ? styles.btnTipoStyle : styles.btnTipoStyle1}>X</button>
						<button onClick={()=>setFilter({...filter, categoria: 'Y'})} style={filter.categoria === 'Y' ? styles.btnTipoStyle : styles.btnTipoStyle1}>Y</button>
						<button onClick={()=>setFilter({...filter, categoria: 'Z'})} style={filter.categoria === 'Z' ? styles.btnTipoStyle : styles.btnTipoStyle1}>Z</button>
					</div>
				</div>
				<div style={styles.listFrameStyle}>
					{operations ?
					operations.map(op => {
						let dd = moment(op.fechaCreacion).format('DD')
						let mm = moment(op.fechaCreacion).format('MM')
						let yyyy = moment(op.fechaCreacion).format('YYYY')
						let fecha = `${dd}/${mm}/${yyyy}`
						return(
							<div key={op._id} style={styles.listWrapper}>
								<div style={{display: 'row', margin: '0.5vh 0.5vw 0.5vh 0.5vw'}}>
									<p style={styles.titleStyle}>Usuario: {op.usrID}</p>
									<p style={styles.titleStyle}>Tipo: {op.tipo ? 'Ingreso' : 'Egreso'}</p>
									<p style={styles.titleStyle}>Concepto: {op.concepto}</p>
									<p style={styles.titleStyle}>Monto: {op.monto}</p>
									<p style={styles.titleStyle}>Categoria: {op.categoria}</p>
									<p style={styles.titleStyle}>Fecha: {fecha}</p>
								</div>
								<div style={{display: 'flex', alignItems: 'center', margin: '0 1vw 0 0'}}>
									<button onClick={()=>setSelectedOP(op)} style={styles.btnEditStyle}>Editar</button>
								</div>
							</div>
						)
					})
					: null
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
		width: '100%'
	},
	filterFrameStyle: {
		display: 'row',
		width: '25vw',
		height: '15vh',
		border: '1.5vh double #746CE2',
		borderRadius: '3vh',
		backgroundColor: '#CDCDCD',
		margin: '4vh 0 0 3vw'
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
	listFrameStyle: {
		display: 'row',
		width: '35vw',
		height: '70vh',
		overflow: 'auto',
		margin: '4vh 0 0 18vw',
		border: '1.5vh double #746CE2',
		borderRadius: '3vh',
		backgroundColor: '#CDCDCD'
	},
	listWrapper: {
		display: 'flex',
		justifyContent: 'space-between',
		margin: '2vh 2vw 1vh 2vw',
		backgroundColor: '#5C5C5C',
		borderRadius: '2vh'
	},
	titleStyle: {
		margin: '0 0 0 0',
		padding: '0 0 0 0',
		fontSize: '3vh',
		color: 'white'
	},
	btnEditStyle: {
		margin: '0 0 0 0',
		padding: '0.8vh 0.8vw 0.8vh 0.8vw',
		border: '0.5vh solid #E58424',
		borderRadius: '2vh',
		cursor: 'pointer',
		backgroundColor: '#F6C798',
		color: 'black',
		fontSize: '3vh'
	}
}
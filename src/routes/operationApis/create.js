const router = require('express').Router()
const Operacion = require('../../models/Operacion')

// --------------------------------------------------------------------------------------------- POST

router.post('/', async (req, res) => {
	if (req.isAuthenticated()) {
		const {usrID, tipo, monto, concepto, categoria} = req.body
		const operation = new Operacion({usrID, tipo, monto, concepto, categoria})
		await operation.save()
			.then(() => res.json({body: {status: 'Creado'}}))
			.catch(e => res.json({body: {status: 'Error'}}))
	}
	else {
		res.json({body: {status: 'No Autorizado'}})
	}
})

// ---------------------------------------------------------------------------------------------

module.exports = router
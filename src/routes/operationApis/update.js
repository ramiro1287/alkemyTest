const router = require('express').Router()
const Operacion = require('../../models/Operacion')

// --------------------------------------------------------------------------------------------- PUT

router.put('/', async (req, res) => {
	if (req.isAuthenticated()) {
		const {idOP, monto, concepto, categoria} = req.body
		await Operacion.findByIdAndUpdate({_id: idOP}, {monto, concepto, categoria})
			.then(res.json({body: {status: 'Actualizado'}}))
			.catch(e => {console.error(e); res.json({body: {status: 'Error'}})})
	}
	else {
		return res.json({body: {status: 'No Autorizado...'}})
	}
})

// ---------------------------------------------------------------------------------------------

module.exports = router
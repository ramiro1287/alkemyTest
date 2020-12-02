const router = require('express').Router()
const Operacion = require('../../models/Operacion')

// --------------------------------------------------------------------------------------------- DELETE

router.delete('/', async (req, res) => {
	if (req.isAuthenticated()) {
		const {idOP} = req.body
		await Operacion.findOneAndRemove({_id: idOP})
		.then(res.json({body: {status: 'Borrado'}}))
		.catch(e => console.error(e))
	}
	else {
		return res.json({body: {status: 'No Autorizado...'}})
	}
})

// ---------------------------------------------------------------------------------------------

module.exports = router
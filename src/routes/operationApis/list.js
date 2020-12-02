const router = require('express').Router()
const Operacion = require('../../models/Operacion')
const moment = require('moment')

function bubble_Sort(a) {
    var swapp
    var n = a.length-1
    var x=a
    do {
        swapp = false
        for (var i=0; i < n; i++) {
        	var iDD = a[i].fechaCreacion
        	var jDD = a[i+1].fechaCreacion
            if (iDD < jDD)
            {
               var temp = x[i]
               x[i] = x[i+1]
               x[i+1] = temp
               swapp = true
            }
        }
        n--
    } while (swapp)
 return x
}

// --------------------------------------------------------------------------------------------- POST

router.post('/', async (req, res) => {
	if (req.isAuthenticated()) {
		const {tipo, categoria} = req.body
		if (categoria === '') {
			var operaciones = await Operacion.find({tipo})
		}
		else {
			var operaciones = await Operacion.find({$and:[{tipo}, {categoria}]})
		}
		bubble_Sort(operaciones)
		res.json({body: {status: 'OK', operaciones}})
	}
	else {
		res.json({body: {status: 'No Autorizado'}})
	}
})

// ---------------------------------------------------------------------------------------------

module.exports = router
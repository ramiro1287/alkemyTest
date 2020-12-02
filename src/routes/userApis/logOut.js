const router = require('express').Router()

// --------------------------------------------------------------------------------------------- GET

router.get('/', (req, res)=> {
	if (req.isAuthenticated()) {
	req.logOut()
	const usrState = req.isAuthenticated()
	return res.json({body: {usrLogged: usrState}})
	}
	else {
		const usrState = req.isAuthenticated()
		return res.json({body: {usrLogged: usrState}})
	}
})

// ---------------------------------------------------------------------------------------------

module.exports = router
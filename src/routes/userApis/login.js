const router = require('express').Router()
const Usuario = require('../../models/Usuario')

// --------------------------------------------------------------------------------------------- POST

router.post("/", async (req, res) => {
	if (req.isAuthenticated()) {
		const usrState = req.isAuthenticated()
		return res.json({body: {wrongData: false, usrLogged: usrState}})
	}
	else {
		const {email, password} = req.body
		const user = await Usuario.findOne({email: email})
		if (user) {
			const match = await user.compararPassword(password, user.password)
			if (match) {
				req.logIn(user, (err) => {
					if (err) {
						return console.error(err)
					}
					else {
						const usrState = req.isAuthenticated()
						return res.json({body: {wrongData: false, usrLogged: usrState}})
					}
				})
			}
			else {
				const usrState = req.isAuthenticated()
				return res.json({body: {wrongData: true, usrLogged: usrState}})
			}
		}
		else {
			const usrState = req.isAuthenticated()
			return res.json({body: {wrongData: true, usrLogged: usrState}})
		}
	}
})

// ---------------------------------------------------------------------------------------------

module.exports = router
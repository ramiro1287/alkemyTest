
// --------------------------------------------------------------------------------------------- Imports

const path = require('path')
const express = require('express')
const session = require('express-session')
const mongoose = require('mongoose')
const MongoStore = require('connect-mongo')(session)
const passport = require('passport')
const Usuario = require('./models/Usuario')

// --------------------------------------------------------------------------------------------- Settings

require('dotenv').config()
const app = express()

// -------------------------------------------------------- MongoDB Config
const {db_IP, db_NAME, db_PORT} = process.env
const db_url = `mongodb://${db_IP}:${db_PORT}/${db_NAME}`
const db_options = {
	useUnifiedTopology: true,
	useNewUrlParser: true
}
mongoose.connect(db_url, db_options)
	.then(db => console.log('DB conectada...'))
	.catch(err => console.error(err))

// --------------------------------------------------------------------------------------------- Middlewares

app.use(express.json())
app.use(express.urlencoded({limit: '15mb', extended: true}))

// -------------------------------------------------------- Sessions Config
const {db_Secret} = process.env
const sessionStore = new MongoStore({
	mongooseConnection: mongoose.connection,
	collection: 'sessions'
})
app.use(session({
	secret: db_Secret,
	resave: false,
	saveUninitialized: true,
	store: sessionStore,
	cookie: {
		maxAge: 1000 * 60 * 60 * 24,
		httpOnly: true,
		sameSite: true,
		secure: false
	}
}))

// -------------------------------------------------------- Passport Config
passport.serializeUser((user, done) => {
	done(null, user.id)
})
passport.deserializeUser((userId, done) => {
	Usuario.findById(userId)
		.then(user => {
			done(null, user)
		})
		.catch(err => done(err))
})
app.use(passport.initialize())
app.use(passport.session())

// --------------------------------------------------------------------------------------------- Routes

// User Apis
app.use('/users/login', require('./routes/userApis/login'))
app.use('/users/register', require('./routes/userApis/register'))
app.use('/users/logstatus', require('./routes/userApis/logStatus'))
app.use('/users/logout', require('./routes/userApis/logOut'))
//app.use('/users/upload', require('./routes/userApis/profileUpload'))
//app.use('/users/updateUser', require('./routes/userApis/update'))

// Operations Apis
app.use('/operations/create', require('./routes/operationApis/create'))
app.use('/operations/delete', require('./routes/operationApis/delete'))
app.use('/operations/update', require('./routes/operationApis/update'))
app.use('/operations/list', require('./routes/operationApis/list'))

// --------------------------------------------------------------------------------------------- Static Files

app.use(express.static(path.join(__dirname, 'public')))

// --------------------------------------------------------------------------------------------- Start Server

const {serverIP, serverPORT} = process.env
app.listen(serverPORT, serverIP, () => {
	console.log(`Server On: http://${serverIP}:${serverPORT}/`)
})
module.exports = app
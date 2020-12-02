const { Schema, model } = require("mongoose")
const bcryptjs = require("bcryptjs")

const ModeloUsuario = new Schema({
	email: {type: String, required: true},
	password: {type: String, required: true},
	admin: {type: Boolean, default: false},
	nombre: {type: String, maxlength: 20, default: ""},
	apellido: {type: String, maxlength: 20, default: ""},
	fechaNacimiento: {type: String, default: ""},
	sexo: {type: Boolean, default: true},
	avatar: {type: String, default: "defaultAvatar.png"},
	fechaCreacion: {type: Date, default: Date.now}
})

ModeloUsuario.methods.cifrarPassword = async (pass) => {
	const salt = await bcryptjs.genSalt(10)
	return (await bcryptjs.hash(pass, salt))
}

ModeloUsuario.methods.compararPassword = async (pass1, pass2) => {
	return (await bcryptjs.compare(pass1, pass2))
}

module.exports = model("Usuario", ModeloUsuario)
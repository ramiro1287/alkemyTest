const { Schema, model } = require("mongoose")

const ModeloOperacion = new Schema({
	usrID: {type: String, default: ''},
	tipo: {type: Boolean, default: false},
	monto: {type: Number, default: 0},
	concepto: {type: String, default: ''},
	categoria: {type: String, default: ''},
	fechaCreacion: {type: Date, default: Date.now}
})

module.exports = model("Operacion", ModeloOperacion)
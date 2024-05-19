const mongoose = require('mongoose')
const { Schema } = mongoose
const Concluidos = mongoose.model(
    'Concluidos',
    new Schema (
        {
            numero:{
                type: String,
                required: true
            },
            responsavel:{
                type: String,
                required: true
            },
            dataInicio:{
                type: String,
                required: true
            },
            dataFinal:{
                type: String,
                required: true
            }
        },
        { timestamps: true }
    )
)

module.exports = Concluidos
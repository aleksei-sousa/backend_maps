const mongoose = require('mongoose')
const { Schema } = mongoose
const Territorios = mongoose.model(
    'Territorios',
    new Schema (
        {
            numero:{
                type: String,
                required: true
            },
            // responsavel:{
            //     type: String,
            //     required: true
            // },
            anotacoes:{
                type: [String],
                required: true
            },
            marcacoes:{
                type: [String],
                required: false
            },
            dataInicio:{
                type: String,
                required: false
            },
            dataFinal:{
                type: String,
                required: false
            },
            concluido:{
                type: Boolean,
                required: false
            }
        },
        { timestamps: true }
    )
)

module.exports = Territorios
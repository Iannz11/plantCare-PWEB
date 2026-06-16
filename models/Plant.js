const mongoose = require('mongoose');

const PlantSchema = new mongoose.Schema({

    apelido: String,

    especie: String,

    descricao: String,

    dataPlantio: Date,

    ultimaRega: Date,

    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }

});

module.exports = mongoose.model('Plant', PlantSchema);
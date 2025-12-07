let mongoose = require('mongoose');
let Schema = mongoose.Schema;
let aggregatePaginate = require('mongoose-aggregate-paginate-v2');

let AssignmentSchema = Schema({
    id: Number,
    dateDeRendu: Date,
    nom: String,
    rendu: Boolean
});

// Ajouter le plugin de pagination
AssignmentSchema.plugin(aggregatePaginate);

// C'est à travers ce modèle Mongoose qu'on pourra faire le CRUD
// Utiliser le nom exact de la collection dans MongoDB
module.exports = mongoose.model('Assignment', AssignmentSchema, 'assignements');

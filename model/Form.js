const mongoose = require('mongoose');
const Schema = mongoose.Schema;
 
let Form = new Schema({
  nome: {
    type: String
  },
  email: {
    type: String
  },
  telefone: {
    type: String
  },
  cep: {
    type: String
  },
  rua: {
    type: String
  }
 
},{collection: 'form'
 
});
 
module.exports = mongoose.model ('Form', Form);
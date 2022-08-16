const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/codeial_development');

const db = mongoose.connection;

db.on('error',console.error.bind(console,"ERROR CONNECTING TO MONGOdb"));

db.once('open',function(){
    console.log('Connected to DB :: MongoDB');
})

module.exports = db;

//scehma of db

const mongoose = require('mongoose');

const bakeryItemSchema = new mongoose.Schema({
    nuts:Number,
    soda:Number,
    flour:Number,
    sugar:Number,
    oil:Number,
},{ collection: 'BakeryItem' }
);



const BakeryItem = mongoose.model('BakeryItem', bakeryItemSchema);

module.exports =BakeryItem;

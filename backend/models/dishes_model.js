const mongoose = require('mongoose');


const Dishes = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    image_url: {
        type: String,
    },
    type: { // it will tell whether the dish is of quantity or of number
        type: String,
        required: true
    },
    catagory: {
        type: String,
        required: true
    },
    id:{
        type: String,
        required: true,
        unique: true
    },
    price:{
        type: Number,
        required: true
    }
});



//lets create a model
const DishesModel = mongoose.model('Dishes', Dishes);

module.exports = DishesModel;
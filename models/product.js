const mongoose = require('mongoose');
const User = require('./user');

const Schema = mongoose.Schema;

const productSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    imageUrl: {
        type: String,
        required: true
    }, 
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }


})

productSchema.pre('remove', function(next) {
    User.find({'cart.items.productId': this._id})
        .then(users => {
            users.forEach(user => {
                user.cart.items = user.cart.items.filter(item => {
                    return item.productId.toString() !== this._id.toString();
                })

                user.save().then(() => {
                    console.log('user cart updated')
                    next();
                })
                .catch(err => console.log(err))

            })
            })
        .catch(err => console.log(err))
})

module.exports = mongoose.model('Product', productSchema);





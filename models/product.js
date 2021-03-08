const getDb = require('../util/database').getDb;
const { ObjectId } = require('mongodb');





class Product {
    constructor(title, price, description, imageUrl, id, userId) {
        this.title = title;
        this.price = price;
        this.description = description;
        this.imageUrl = imageUrl;
        this._id = id ? new ObjectId(id) : null;
        this.userId = userId;
    }

    save() {
        const db = getDb();
        let dbOp;
        if (this._id){
            
            dbOp =  db.collection('products').updateOne({_id: this._id}, {
                $set: this
            })
                
        }else {
            dbOp = db.collection('products').insertOne(this)
            
        }

        return dbOp.then(result => {
            return result
        })
        .catch(err => console.log(err))
        
    }

    static fetchAll() {
        const db = getDb();
        return db
            .collection('products')
            .find()
            .toArray()
            .then(products => {
                return products
            })
            .catch(err => console.log(err))
    }

    static findById(id) {
        const db = getDb();
        return db.collection('products')
            .findOne({_id: new ObjectId(id)})
            .then(product => {
                return product
            })
            .catch(err => console.log(err));
    }

    static deleteById(prodId) {
        const db = getDb();
        return db.collection('products').deleteOne({_id: new ObjectId(prodId)})
            .then(result => {
                console.log('Deleted')
                return result;
            })
            .catch(err => console.log(err))

    }

    
}




module.exports = Product;
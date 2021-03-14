const Product = require('../models/product');
const Order = require('../models/order');


exports.getProducts = (req, res, next) => {
    // console.log('shop.js', products)
    // res.sendFile(path.join(rootDir, 'views', 'shop.html'));
    Product.find().then(products => {
        
        res.render('shop/product-list', {
            prods: products,
            pageTitle: 'All Products',
            path: '/products'


        })
    }).catch(err => {
        console.log(err)
    })



}



exports.getProduct = (req, res, next) => {
    const productId = req.params.productId;
    

    Product.findById(productId).then(product => {
        res.render('shop/product-detail', {
            product: product,
            pageTitle: product.title,
            path: '/products'
        })
    }).catch(err => {
        console.log(err)
    })

};
exports.getIndex = (req, res, next) => {

    Product.find().then(products => {
        res.render('shop/index', {
            prods: products,
            path: '/',
            pageTitle: 'Shop'
            
        });
    }).catch(err => {
        console.log(err)
    })


}


exports.getCart = (req, res, next) => {
    req.user
    .populate('cart.items.productId')
    .execPopulate()
    .then(user => {
        const products = user.cart.items;
            res.render('shop/cart', {
                    path: '/cart',
                    pageTitle: 'Your Cart',
                    products: products

            })
        }).catch(err => console.log(err))

}

exports.postCart = (req, res, next) => {
    const productId = req.body.productId;
    Product.findById(productId).then(product => {
        return req.user.addToCart(product)
    }).then(result => {
        res.redirect('/cart');
    })
    .catch(err => console.log(err))


}




exports.postOrder = (req, res, next) => {
    
    req.user
    .populate('cart.items.productId')
    .execPopulate()
    .then(user => {
        const products = user.cart.items.map(item => {
            return {product: {...item.productId._doc}, quantity: item.quantity}
        })
        const order = new Order({
            user: {
                email: req.user.email,
                userId: req.user
            },
            products: products
        })

        return order.save();
    })
    .then(result => {
            return req.user.clearCart()
        })
    .then(result => {
            res.redirect('/orders')
        })
    .catch(err => console.log(err))
};

exports.getOrders = (req, res, next) => {
        Order.find({'user.userId': req.user._id})
        .then(orders => {
            res.render('shop/orders', {
                path: '/orders',
                pageTitle: 'Your Orders',
                orders
            })
        })

}

exports.postCartDeleteProduct = (req, res, next) => {

    const prodId = req.body.productId;
        req.user.removeFromCart(prodId)
        .then(result => {
            res.redirect('/cart')
        })
        .catch(err => console.log(err));


}


// exports.getCheckout = (req, res, next) => {

//     res.render('shop/checkout', {
//         path: '/checkout',
//         pageTitle: 'Check'
//     })
// }
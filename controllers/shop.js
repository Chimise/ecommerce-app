const Product = require('../models/product');
//const Cart = require('../models/cart');


exports.getProducts = (req, res, next) => {
    // console.log('shop.js', products)
    // res.sendFile(path.join(rootDir, 'views', 'shop.html'));
    Product.fetchAll().then(products => {
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
    // Product.findAll({ where: { id: productId } })
    //     .then(products => {
    //         res.render('shop/product-detail', {
    //             product: products[0],
    //             pageTitle: products[0].title,
    //             path: '/products'
    //         })
    //     })
    //     .catch(err => console.log(err))

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

    Product.fetchAll().then(products => {
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
    req.user.getCart().then(products => {
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
    let fetchCart;
    req.user
        .addOrder()
        .then(result => {
            res.redirect('/orders')
        })
        .catch(err => console.log(err))
};

exports.getOrders = (req, res, next) => {
    req.user.getOrders()
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
        req.user.deleteItemFromCart(prodId)
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
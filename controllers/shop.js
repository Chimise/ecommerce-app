const Product = require('../models/product');
const Cart = require('../models/cart');


exports.getProducts = (req, res, next) => {
    // console.log('shop.js', products)
    // res.sendFile(path.join(rootDir, 'views', 'shop.html'));
    Product.findAll().then(products => {
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

    Product.findByPk(productId).then(product => {

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

    Product.findAll().then(products => {
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
    req.user.getCart().then(cart => {
            return cart.getProducts();
        })
        .then(products => {
            res.render('shop/cart', {
                path: '/cart',
                pageTitle: 'Your Cart',
                products: products
            })
        })
        .catch(err => console.log())

}

exports.postCart = (req, res, next) => {
    const productId = req.body.productId;
    let fetchedCart;
    let newQuantity = 1;

    req.user
        .getCart()
        .then(cart => {
            fetchedCart = cart;

            return cart.getProducts({ where: { id: productId } })
        })
        .then(products => {
            let product;
            if (products.length > 0) {
                product = products[0];
            }

            if (product) {
                const oldQuantity = product.cartItem.quantity;
                newQuantity = oldQuantity + 1;
                return product

            }

            return Product.findByPk(productId)

        })
        .then(product => {
            return fetchedCart.addProduct(product, { through: { quantity: newQuantity } })
        })
        .then(() => {
            res.redirect('/cart')
        })
        .catch(err => console.log(err))



}
exports.postOrder = (req, res, next) => {
    let fetchCart;
    req.user
        .getCart()
        .then(cart => {
            fetchCart = cart;
            return cart.getProducts()
        })
        .then(products => {
            return req.user
                .createOrder()
                .then(order => {

                    return order.addProducts(products.map(product => {
                        product.orderItem = { quantity: product.cartItem.quantity }
                        return product;
                    }))
                })
                .catch(err => console.log(err))
        })
        .then(result => {
            return fetchCart.setProducts(null)

        })
        .then(result => {
            res.redirect('/orders')
        })
        .catch(err => console.log(err))
};

exports.getOrders = (req, res, next) => {
    req.user.getOrders({ include: ['products'] })
        .then(orders => {
            console.log(orders)
            res.render('shop/orders', {
                path: '/orders',
                pageTitle: 'Your Orders',
                orders
            })
        })

}

exports.postCartDeleteProduct = (req, res, next) => {

    const prodId = req.body.productId;
    req.user.getCart()
        .then(cart => {
            return cart.getProducts({ where: { id: prodId } })
        })
        .then(products => {
            const product = products[0];
            return product.cartItem.destroy()
        })
        .then(result => {
            res.redirect('/cart');
        })
        .catch(err => console.log(err))


}


exports.getCheckout = (req, res, next) => {

    res.render('shop/checkout', {
        path: '/checkout',
        pageTitle: 'Check'
    })
}
const path = require( 'path' );
const {
    check,
    body
} = require( 'express-validator/check' )

const express = require( 'express' );

const adminController = require( '../controllers/admin' )
const isAuth = require( '../middleware/is-auth' );

const router = express.Router();


router.get( '/add-product', isAuth, adminController.getAddProduct )

router.get( '/products', isAuth, adminController.getProducts )

router.post( '/add-product', [
    body( 'title', 'The title should have at least three characters and must be alphanumeric' )
    .isString()
    .isLength( {
        min: 3
    } )
    .trim(),
    body( 'price' )
    .isFloat()
    .withMessage( 'The price should contain decimal' ),
    body( 'description', 'The description field should have at least five characters' )
    .isLength( {
        min: 5,
        max: 400
    } )
    .trim()
], isAuth, adminController.postAddProduct )

router.get( '/edit-product/:productId', isAuth, adminController.getEditProduct )

router.post( '/edit-product',
    [
        body( 'title', 'The title should have at least three characters and must be alphanumeric' )
        .isString()
        .isLength( {
            min: 3
        } )
        .trim(),
        body( 'price' )
        .isFloat()
        .withMessage( 'The price should contain decimal' ),
        body( 'description', 'The description field should have at least five characters' )
        .isLength( {
            min: 5,
            max: 400
        } )
        .trim()
    ], isAuth, adminController.postEditProduct );

router.post( '/delete-product', isAuth, adminController.postDeleteProduct )

module.exports = router;
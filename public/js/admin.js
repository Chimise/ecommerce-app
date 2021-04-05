const deleteProduct = ( btn ) => {
    const prodId = btn.parentNode.querySelector( '[name="productId"]' ).value;
    const csrf = btn.parentNode.querySelector( '[name=_csrf]' ).value;

    const productElement = btn.closest( 'article' );

    fetch( '/admin/product/' + prodId, {
            method: 'DELETE',
            headers: {
                'csrf-token': csrf
            }
        } )
        .then( result => {
            console.log( result )
            return result.json()
        } )
        .then( data => {
            console.log( data );
            if ( data.message === 'Success' ) {
                productElement.parentNode.removeChild( productElement )
            } else {
                console.error( 'Product could not be deleted' )
            }

        } )
        .catch( err => {
            console.log( err )
        } )
}
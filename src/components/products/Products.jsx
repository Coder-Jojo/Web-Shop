import React from 'react';
import {Grid} from '@material-ui/core'

import Product from './product/product'
import useStyles from './styles'

// const products = [
//     {
//         id:1, name: 'Shoes', description: 'runnign shoes', price: 500, image: 'a.jpg'
//     },
//     {
//         id:2, name: 'Macbook', description: 'apple macbook', price: 500, image: 'a.jpg'
//     }
// ]

const Products = ({products, onAddToCart}) => {
    const classes = useStyles()
    return (
        <main className={classes.content}>
            <div className={classes.toolbar} />
            <Grid container justifyContent="center" spacing={4}>
                    {products.map((product) => (
                        <Grid item key={product.id} xs={12} sm={6} md={4} lg={3}>
                                {/* {console.log(product)} */}
                                {/* {console.log(Product)} */}
                                <Product product={product} onAddToCart={onAddToCart} />
                        </Grid>
                        )
                    )}
            </Grid>
        </main>
    )
    
}

export default Products;
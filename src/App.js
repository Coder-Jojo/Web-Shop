import React, {useState, useEffect} from 'react'
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import {commerce} from './lib/commerce'
import Products from './components/products/Products'
import Navbar from './components/Navbar/Navbar'
import Cart from './components/Cart/Cart'

const App = () => {

    const [products, setProducts] = useState([])

    const [cart, setCart] = useState({})

    const fetchProducts = async () => {
        const {data} = await commerce.products.list(); 
        
        setProducts(data)
    }

    const fetchCart = async () => {
        const res = await commerce.cart.retrieve()

        setCart(res)
    }

    const handleAddToCart = async (productId, quantity) => {
        const item = await commerce.cart.add(productId, quantity)

        setCart(item.cart)
    }

    const handleUpdateCart = async (productId, quantity) => {
        const res = await commerce.cart.update(productId, {quantity})

        setCart(res.cart)
    }

    const handleRemoveFromCart = async (productId) => {
        const {cart} = await commerce.cart.remove(productId)

        setCart(cart)
    }

    const handleEmptyCart = async () => {
        const {cart} = await commerce.cart.empty();

        setCart(cart)
    }

    useEffect(() =>{
        fetchProducts()
        fetchCart()
    }, [])

    console.log(cart)

    return (
        <Router>
            <div>
                <Navbar totalItems={cart.total_items} />
                <Switch>
                    <Route exact path='/'>
                        <Products products={products} onAddToCart={handleAddToCart} />  

                    </Route>
                    <Route exact path='/cart'>
                        <Cart 
                            cart={cart} 
                            handleEmptyCart = {handleEmptyCart}
                            handleUpdateCart = {handleUpdateCart}
                            handleRemoveFromCart = {handleRemoveFromCart}
                        />
                    </Route>

                </Switch>
                
            </div>
        </Router>
    )
}

export default App

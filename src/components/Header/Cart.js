import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import './Header.css'


class Cart extends Component {

    orderedProducts() {
        const cartArr = [];
        this.props.carts.forEach(elem => {
            
            if (elem.ordered > 0) {
                cartArr.push(elem)
            }
        });
        return cartArr;
    }

    carttext() {
        let totalPrice = 0;
        this.orderedProducts().forEach(elem => {
            totalPrice += (elem.price * elem.ordered);
        })
        return totalPrice > 0 ? "Total: " + totalPrice + " Ft" : "Your cart is empty"
    }

    render() {
        return (
            <div className="cartContent global">
                <div>{this.carttext()}</div>
                <Link  to="/cart"><img id="cart" src="./shopping_cart.png" alt="cart" /></Link>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        carts: state.cart,
        products: state.products
    }

}

export default connect(mapStateToProps)(Cart)
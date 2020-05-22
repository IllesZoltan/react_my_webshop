import React, { Component } from 'react'
import { connect } from 'react-redux'
import {Link} from 'react-router-dom'
import './Header.css'
import RemAddButtons from '../RemAddButtons'

class CartPage extends Component {
    render() {
        const addToClName = 'CP-'
        return (
            <div>
                <div className="carts-cont">
                <h4>Cart Page</h4>
                    {this.props.carts.map((elem,idx) => {
                        return (
                            <div key={idx} className="cart-prod">
                                <div className="cart-img"><img src={elem.images[0]} alt="cartimg" /></div>
                                <div className="cart-det-cont">
                                    <div className="cart-details"><b>{elem.name}</b> - {elem.SKU}</div>
                                    <div className="cart-buttons">
                                        <RemAddButtons clNameAdd={addToClName} product={elem}/>
                                    </div>
                                    <div className="cart-price">
                                        Price: <b>{elem.price * elem.ordered}</b> Ft
                                </div>
                                </div>
                            </div>
                        )
                    })
                    }
                    <div className="cart-action-buttons">
                        <button className="cart-clear" onClick={this.props.clearCart}>Empty Cart</button>
                        <Link to="/checkout"><button className="cart-checkout">Checkout</button></Link>
                    </div>
                </div>


            </div>
        )
    }
}


function mapDispatchToProps(dispatch){
    return{
        clearCart: () => {
            dispatch({type: 'CLEAR_CART'})
        }
    }
}

function mapStateToProps(state) {
    return {
        carts: state.cart
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(CartPage)
import React, { Component } from 'react'
import { connect } from 'react-redux'
import './Header.css'

class CartPage extends Component{
    render(){
        return(
            <div>
                <h4>Cart Page</h4>
                {this.props.carts.map(elem => {
                    return(
                    <div className="cart-prod">
                        <div className="cart-img"><img src={elem.images[0]} alt="cartimg"/></div>
                        <div className="cart-details"><b>{elem.name}</b> - {elem.SKU}</div>
                        
                    </div>
                    )
                })

                }
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        carts: state.cart
    }
}

export default connect(mapStateToProps)(CartPage)
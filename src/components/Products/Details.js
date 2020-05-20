import React from 'react'
import { connect } from 'react-redux'
import './Products.css'

class Details extends React.Component {

    checkCart() {
        const carts = this.props.carts
        const product = this.props.product
        let cartProd = {};
        carts.forEach(elem => {
            if (elem.SKU === product.SKU) {
                cartProd = elem
            }
        })
        return cartProd.ordered
    }

    createAddBtn() {
        let add = false
        if (this.props.product.onstock > 0) add = true
        if (this.checkCart() === this.props.product.onstock) add = false
        return add
    }

    createRemBtn() {
        let remove = false;
        const carts = this.props.carts
        const product = this.props.product
        carts.forEach(elem => {
            if (elem.SKU === product.SKU) {
                if (elem.ordered > 0) {
                    remove = true
                }
                if (elem.ordered < product.onstock) {
                    remove = true
                }
            }
        })
        return remove;
    }

    render() {

        let remButton = ""
        let addButton = ""
        if (this.createRemBtn()) remButton = <button onClick={() => this.props.remItem(this.props.product)}>Remove one</button>
        if (this.createAddBtn()) addButton = <button onClick={() => this.props.addItem(this.props.product)}>Add to cart</button>

        return (
            <div className="details_container">
                <div className="descr_text">
                    <div><h2>{this.props.product.name} ({this.props.product.SKU})</h2></div>
                    <div><strong>{this.props.product.onstock}</strong> pieces on stock</div><br /><br />
                    <div>{this.props.product.description}</div>
                </div>
                <div className="details_button">
                    <div className="rem-btn">{remButton}</div>
                    <div className="ordered-pieces">{this.checkCart()}</div>
                    <div className="add-btn">{addButton}</div>
                </div>
            </div>
        )
    }
}

function mapDispatchToProps(dispatch) {
    return {
        addItem: product => {
            dispatch({ type: 'ADD_TO_CART', product })
        },
        remItem: product => {
            dispatch({ type: 'REMOVE_ONE', product })
        }
    }
}

function mapStateToProps(state) {
    return {
        carts: state.cart
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Details)
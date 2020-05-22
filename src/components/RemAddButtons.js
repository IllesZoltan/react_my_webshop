import React from 'react'
import { connect } from 'react-redux'
import './RemAddButtons.css'


class RemAddButtons extends React.Component {

    createAddButton() {
        let add = false
        let ind = this.props.carts.findIndex(elem => elem.SKU === this.props.product.SKU)
        if (this.props.product.onstock > 0) { add = true }
        if (ind > -1) {
            if (this.props.carts[ind].ordered < this.props.product.onstock) { add = true }
            else { add = false }
        }
        return add
    }

    createRemoveButton() {
        let rem = false
        let ind = this.props.carts.findIndex(elem => elem.SKU === this.props.product.SKU)
        if (ind > -1) {
            if (this.props.carts[ind].ordered > 0) { rem = true }
        }
        return rem
    }

    createInfoText() {
        let ifo = false
        if (this.props.product.onstock < 1) ifo = true
        return ifo
    }

    productInCart(carts, product) {
        let cartProd = {};
        carts.forEach(elem => {
            if (elem.SKU === product.SKU) {
                cartProd = elem
            }
        })
        return cartProd
    }



    render() {
        const remb = this.props.clNameAdd+"remove-button"
        const addb = this.props.clNameAdd+"add-button"

        let removeButton = ''
        let addButton = ''
        let infotxt = ''
        if (this.createRemoveButton()) removeButton = <button className={remb} onClick={() => this.props.removeItem(this.props.product)}></button>
        if (this.createAddButton()) addButton = <button className={addb} onClick={() => this.props.addItem(this.props.product)}></button>
        if (this.createInfoText()) infotxt = 'Out of stock!'


        return (
            <div className="action-info">
                <div className="buttons">
                    <div className="b rem">{removeButton}</div>
                    <div className="pieces">{this.productInCart(this.props.carts, this.props.product).ordered}</div>
                    <div className="b add">{addButton}</div>
                </div>
                <div className="infotext">{infotxt}</div>
            </div>
        )
    }
}




function mapDispatchToProps(dispatch) {
    return {
        addItem: product => {
            dispatch({ type: "ADD_TO_CART", product })
        },
        removeItem: product => {
            dispatch({ type: "REMOVE_ONE", product })
        }
    }
}

function mapStateToProps(state, props) {
    return {
        carts: state.cart
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(RemAddButtons)
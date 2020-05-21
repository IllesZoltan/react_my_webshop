import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import './Products.css'


class ProductBox extends React.Component {

    productInCart(carts, product) {
        let cartProd = {};
        carts.forEach(elem => {
            if (elem.SKU === product.SKU) {
                cartProd = elem
            }
        })
        return cartProd
    }

    checkCart(product) {
        let retVal = false;
        this.props.carts.forEach(cartElem => {
            if (cartElem.SKU === product.SKU) { retVal = true }
        })
        return retVal
    }


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


    render() {
        let url = "/productpage?product=" + this.props.product.SKU

        let removeButton = ''
        let addButton = ''
        let infotxt = ''
        if (this.createRemoveButton()) removeButton = <button onClick={() => this.props.removeItem(this.props.product)}>Remove one</button>
        if (this.createAddButton()) addButton = <button onClick={() => this.props.addItem(this.props.product)}>Add to cart</button>
        if (this.createInfoText()) infotxt = 'Out of stock!'

        return (
            <div className="prodBox">
                <div className="PBImage">
                    <Link to={url}><img src={this.props.product.images[0]} alt="allimgs"/></Link>
                </div>
                <div className="prod_data">
                    <div><Link to={url}>{this.props.product.name}</Link></div>
                    <div>{this.props.product.SKU}</div>
                    <div>{this.props.product.price} Ft</div>
                </div>
                <div className="buttons">
                    <div className="b rem">{removeButton}</div>
                    <div className="itext">{this.productInCart(this.props.carts, this.props.product).ordered}</div>
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

export default connect(mapStateToProps, mapDispatchToProps)(ProductBox)
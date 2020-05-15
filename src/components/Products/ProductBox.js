import React from 'react'
import { connect } from 'react-redux'
import './Products.css'


class ProductBox extends React.Component {
    render() {
        return (
            <div className="prodBox">
                <div className="PBImage">Image</div>
                <div className="prod_data">
                    <div>{this.props.product.name}</div>
                    <div>{this.props.product.SKU}</div>
                    <div>{this.props.product.price} Ft</div>
                </div>
                <div className="buttons">
                    <button>Remove one</button>
                    <div>{this.props.product.ordered}</div>
                    <button onClick={() => this.props.addItem(this.props.product)}>Add to cart</button>
                </div>
            </div>
        )
    }
}

function mapDispatchToProps(dispatch) {
    return {
        addItem: product => {
            dispatch({ type: "ADD_TO_CART", product })
        }
    }
}

function mapStateToProps(state) {
    return {
        products: state.products
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductBox)
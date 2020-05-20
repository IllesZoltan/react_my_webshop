import React from 'react'
import { connect } from 'react-redux'
import './Products.css'
import ProductBox from './ProductBox'

class Products extends React.Component {

    stockCheck(product){
        let retValue = 0
        if(product.onstock > 0) retValue = 1
        return retValue
    }

    render() {
        return (
            <div className="productsContent">
                <div>Products</div>
                <div className="boxContainer">
                    {this.props.products.map((elem, index) => {
                        return (
                            <div key={index} className="boxes">
                                <ProductBox product={elem} />
                            </div>
                            )
                        })
                    }
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        products: state.products
    }
}

export default connect(mapStateToProps)(Products)

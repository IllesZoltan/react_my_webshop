import React from 'react'
import { connect } from 'react-redux'
import './Products.css'
import ProductBox from './ProductBox'

class Products extends React.Component {
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

import React from 'react'
import { connect } from 'react-redux'
import './Products.css'
import {Link} from 'react-router-dom'

class Recommended extends React.Component {

    render() {
        
        return (
            <div>
                <div><h2>Recommended Products</h2></div>
                <div className="rec-container">
                    {this.props.recommends.map((product,idx) => {
                        let url = "/productpage?product=" + product.SKU
                        return (
                            <div key={idx} className="recoms">
                                <Link to={url}><img src={product.images[0]} alt="imgs"/></Link>
                                <div><b>{product.name}</b> - {product.SKU}  .  Price:{product.price} Ft</div>
                            </div>
                        )
                    })}
                </div>
            </div>
        )
    }
}

function mapStateToProps(state, props) {
    const skus = state.recommendations[props.recProd.SKU]
    const recommends = skus.map(sku => state.products.find(p => p.SKU === sku))
    
    return {
        recommends,
        product: state.products
    }
}

export default connect(mapStateToProps)(Recommended)
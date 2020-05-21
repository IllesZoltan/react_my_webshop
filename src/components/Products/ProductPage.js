import React from 'react'
import { connect } from 'react-redux'
import './Products.css'
import ImageGallery from './ImageGallery'
import Details from './Details'
import Recommended from './Recommended.'
import FullSpecs from './FullSpecs'

class ProductPage extends React.Component{


    render(){
        return(
            <div>
                <div><h3>Product Page</h3></div>
                <div className="images">
                    <ImageGallery images={this.props.product.images} />
                    <Details product={this.props.product} />
                </div>
                <div className="specs">
                    <FullSpecs product={this.props.product} />
                </div>
                <div className="recom">
                    <Recommended recProd={this.props.product}/>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state, props) {
    return {
        cart: state.cart.find(c => c.SKU === props.ind),
        product: state.products.find(p => p.SKU === props.ind)
    }
}

export default connect(mapStateToProps)(ProductPage)
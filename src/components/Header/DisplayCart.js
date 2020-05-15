import React, { Component } from 'react'
import { connect } from 'react-redux'
import './Header.css'

class DisplayCart extends Component {

    productPrice(elem) {
        return elem.price * elem.ordered;
    }

    totalPrice() {
        let finalPrice = 0;
        this.props.products.forEach(element => {
            finalPrice += this.productPrice(element);
        });
        return finalPrice
    }

    render() {
        return (
            <div className="listContainer">
                {this.props.products.map((elem, index) => {
                    return (
                        <div key={index} className="list">
                            <div>{elem.ordered}</div>
                            <div> x </div>
                            <div className="name">. {elem.name}</div>
                            <div> = </div>
                            <div>{this.productPrice(elem)} Ft</div>
                        </div>
                    )
                })
                }
                <div className="list">
                    <br/>
                    <div className="name">Total: </div>
                    <div> = </div>
                    <div>{this.totalPrice()} Ft</div>
                </div>
            </div>
        )
    }
}

function mapsStateToProps(state) {
    return {
        products: state.products
    }
}

export default connect(mapsStateToProps)(DisplayCart)

import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Cart from './Cart'
import DisplayCart from './DisplayCart';
import { connect } from 'react-redux'
import './Header.css'


class Header extends Component {
    displayProducts(isOK) {
        if (isOK) {
            document.getElementById("displCont").style.display = "block";
        } else {
            document.getElementById("displCont").style.display = "none";
        }
    }


    render() {
        return (
            <div className="headerContent">
                <div className="logo global"><Link to="/"><img id="logo" src="./logo192.png" alt="logo" /></Link></div>
                <div className="title">My Webshop</div>
                <div className="cart global" onMouseOver={() => this.displayProducts(1)} onMouseOut={() => this.displayProducts()}><Cart className="cart" /></div>
                <div id="displCont" className="displayContainer"><DisplayCart /></div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        data: state.products
    }
}

export default connect(mapStateToProps)(Header)
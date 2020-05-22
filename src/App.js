import React from 'react';
import './App.css';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { createStore } from 'redux';
import Products from './components/Products/Products';
import ProductPage from './components/Products/ProductPage';
import Header from './components/Header/Header';
import Offerings from './components/Offerings/Offerings';
import Footer from './components/Footer/Footer';
import CartPage from './components/Header/CartPage';
import Checkout from './components/Header/Checkout';






//const url = "http://localhost:7000/database";

// const data = fetch(url, {
//   method: 'POST',
//   headers: {'Content-type':'application/json'}
// });


// data.then((response) => {
//   return response.json();
// }).then((value) => {
//   initialState = value
//   console.log('App data: ',value.name);
// });


//const initialState = {
// cart: [],
// products: [
//   {
//     images: [
//       './images/MP/001.jpg',
//       './images/MP/002.jpg',
//       './images/MP/003.jpg',
//       './images/MP/004.jpg',
//       './images/MP/005.jpg',
//       './images/MP/006.jpg',
//       './images/MP/007.jpg',
//       './images/MP/008.jpg',
//       './images/MP/009.jpg',
//       './images/MP/010.jpg'
//     ],
//     imgPrimary: 0,
//     name: "Mobile Phone",
//     SKU: SKUgenerator("Mobile Phone"),
//     price: 50000,
//     onstock: 5,
//     description: "mobile phone description",
//     specs: {
//       foo: "Mobile Phone foo",
//       bar: "Mobile Phone bar",
//       baz: "Mobile Phone baz"
//     }
//   },
//   {
//     images: [
//       './images/MP/004.jpg',
//       './images/MP/005.jpg',
//       './images/MP/006.jpg',
//       './images/MP/007.jpg'
//     ],
//     imgPrimary: 0,
//     name: "I Phone",
//     SKU: SKUgenerator("I Phone"),
//     price: 70000,
//     onstock: 9,
//     description: "iPhone description",
//     specs: {
//       foo: "I Phone foo",
//       bar: "I Phone bar",
//       baz: "I Phone baz"
//     }
//   },
//   {
//     images: [
//       './images/MP/008.jpg',
//       './images/MP/009.jpg',
//       './images/MP/010.jpg'
//     ],
//     imgPrimary: 0,
//     name: "Tele Phone",
//     SKU: SKUgenerator("Tele Phone"),
//     price: 10000,
//     onstock: 0,
//     description: "telephone description",
//     specs: {
//       foo: "Tele Phone foo",
//       bar: "Tele Phone bar",
//       baz: "Tele Phone baz"
//     }
//   }
// ],
// offerings: [
//   {
//     text: 'some marketing text',
//     image: './images/MP/001.jpg',
//     url: 'productpage?product=MP'
//   },
//   {
//     text: 'some marketing text 2',
//     image: './images/MP/002.jpg',
//     url: 'productpage?product=IP'
//   },
//   {
//     text: 'some marketing text 3',
//     image: './images/MP/003.jpg',
//     url: 'productpage?product=TP'
//   }
// ],
// recommendations: {
//   'MP': ['IP', 'TP'],
//   'IP': ['MP', 'TP'],
//   'TP': ['IP', 'MP']
// }
//}


// function SKUgenerator(name) {
//   const tempArr = name.split(" ");
//   let value = "";
//   tempArr.forEach(element => {
//     value += element.substr(0, 1).toUpperCase();
//   });
//   return value
// }

function getQueryVariable() {
  let retVal = window.location.search.substring(1);
  let val = retVal.split('=');
  return val[1]
}




function App(props) {
  if(!props.dataLoaded){
    return <div>Loading</div>
  }
  return (
    <div className="container">
      
        <BrowserRouter>
          <Header />

          <Switch>
            <Route path="/productpage" render={() => <ProductPage ind={getQueryVariable()} />} />
            <Route path="/cart">
              <CartPage />
            </Route>
            <Route path="/checkout">
              <Checkout />
            </Route>
            <Route path="/">
              <Offerings className="offerings" offer_images={props.prodOffers} />
              <Products />
            </Route>

          </Switch>



          <Footer />
        </BrowserRouter>

    </div>
  );
}

function mapStateToProps(state) {
  return {
    dataLoaded: state !== undefined,
    prodOffers: state? state.offerings : []
  }
}

export default connect(mapStateToProps)(App);

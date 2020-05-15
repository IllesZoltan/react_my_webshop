import React from 'react';
import './App.css';
import { BrowserRouter, Switch, Route, Link } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import Products from './components/Products/Products';
import Header from './components/Header/Header';
import Offerings from './components/Offerings/Offerings';
import Footer from './components/Footer/Footer';


const initialState = {
  cart: [
    {
      name: "Mobile Phone",
      SKU: SKUgenerator("Mobile Phone"),
      price: 50000,
      onstock: 5,
      ordered: 3
    }
  ],
  products: [
    {
      name: "Mobile Phone",
      SKU: SKUgenerator("Mobile Phone"),
      price: 50000,
      onstock: 5,
      ordered: 3
    },
    {
      name: "I Phone",
      SKU: SKUgenerator("I Phone"),
      price: 70000,
      onstock: 5,
      ordered: 1
    },
    {
      name: "Tele Phone",
      SKU: SKUgenerator("Tele Phone"),
      price: 10000,
      onstock: 5,
      ordered: 2
    }
  ]
}

const store = createStore(reducer);

function reducer(state = initialState, action) {
  switch (action.type) {
    case 'ADD_TO_CART':
      const newProducts = [...state.products]
      newProducts.forEach(prodElem => {
        if (prodElem.SKU === action.product.SKU) {
          prodElem.ordered += 1
        }
      })
      const newState = { ...state, products: newProducts }
      return newState

    default: return state
  }
}


function SKUgenerator(name) {
  const tempArr = name.split(" ");
  let value = "";
  tempArr.forEach(element => {
    value += element.substr(0, 1).toUpperCase();
  });
  return value
}

function App() {
  return (
    <div className="container">
      <Provider store={store}>
        <BrowserRouter>
          <Header />

          <Switch>
            <Route path="/cart">
              <p>Cart page</p>
              <Link to="/checkout">Checkout</Link>
            </Route>
            <Route path="/checkout">
              <p>Checkout page</p>
            </Route>
            <Route path="/">
              <Offerings />
              <Products />
            </Route>

          </Switch>



          <Footer />
        </BrowserRouter>
      </Provider>
    </div>
  );
}

export default App;

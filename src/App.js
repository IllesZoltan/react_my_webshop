import React from 'react';
import './App.css';
import { BrowserRouter, Switch, Route, Link } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import Products from './components/Products/Products';
import ProductPage from './components/Products/ProductPage';
import Header from './components/Header/Header';
import Offerings from './components/Offerings/Offerings';
import Footer from './components/Footer/Footer';


const initialState = {
  cart: [],
  products: [
    {
      images: [
        './images/MP/001.jpg',
        './images/MP/002.jpg',
        './images/MP/003.jpg',
        './images/MP/004.jpg',
        './images/MP/005.jpg',
        './images/MP/006.jpg',
        './images/MP/007.jpg',
        './images/MP/008.jpg',
        './images/MP/009.jpg',
        './images/MP/010.jpg'
      ],
      imgPrimary: 0,
      name: "Mobile Phone",
      SKU: SKUgenerator("Mobile Phone"),
      price: 50000,
      onstock: 5,
      description: "mobile phone description",
      specs: {
        foo: "foo",
        bar: "bar",
        baz: "baz"
      }
    },
    {
      images: [
        './images/MP/004.jpg',
        './images/MP/005.jpg',
        './images/MP/006.jpg',
        './images/MP/007.jpg'
      ],
      imgPrimary: 0,
      name: "I Phone",
      SKU: SKUgenerator("I Phone"),
      price: 70000,
      onstock: 9,
      description: "iPhone description",
      specs: {
        foo: "foo",
        bar: "bar",
        baz: "baz"
      }
    },
    {
      images: [
        './images/MP/008.jpg',
        './images/MP/009.jpg',
        './images/MP/010.jpg'
      ],
      imgPrimary: 0,
      name: "Tele Phone",
      SKU: SKUgenerator("Tele Phone"),
      price: 10000,
      onstock: 0,
      description: "telephone description",
      specs: {
        foo: "foo",
        bar: "bar",
        baz: "baz"
      }
    }
  ],
  offerings: [
    {
      text: 'some marketing text',
      image: './images/MP/001.jpg',
      url: 'productpage?product=MP'
    },
    {
      text: 'some marketing text 2',
      image: './images/MP/002.jpg',
      url: 'productpage?product=IP'
    },
    {
      text: 'some marketing text 3',
      image: './images/MP/003.jpg',
      url: 'productpage?product=TP'
    }
  ],
  recommendations: {
    'MP': ['IP', 'TP'],
    'IP': ['MP', 'TP'],
    'TP': ['IP', 'MP']
  }
}

let prodOffers = []

const store = createStore(reducer);

function reducer(state = initialState, action) {

  prodOffers = state.offerings
  
  switch (action.type) {
    case 'ADD_TO_CART':
      // const newAddProducts = [...state.products]
      const newAddCartProd = [...state.cart]

      if (action.product.onstock > 0) {

        if (checkCart(state, action.product) > -1) {
          // A Cart nem üres, vagy a termék már benne van
          newAddCartProd.forEach(cartElem => {
            if (cartElem.SKU === action.product.SKU) {
              cartElem.ordered += checkCart(state, action.product)
            }
          })
        } else {
          //Új termék hozzáadása a Carthoz
          newAddCartProd.push(action.product)
          const cartFoundIdx = newAddCartProd.findIndex(elem => elem.SKU === action.product.SKU)
          newAddCartProd[cartFoundIdx].ordered = 1
        }
      }

      const newAddState = { ...state, cart: newAddCartProd }
      return newAddState

    case 'REMOVE_ONE':
      const newRemCartProducts = [...state.cart]
      newRemCartProducts.forEach(cartElem => {
        if (cartElem.SKU === action.product.SKU) {
          if (cartElem.ordered > 0) {
            cartElem.ordered -= 1
          }
          if(cartElem.ordered < 1){
            const ind = newRemCartProducts.findIndex(elem => elem.SKU === action.product.SKU)
            newRemCartProducts.splice(ind,1)
          }
        }
      })
      const newRemoveState = { ...state, cart: newRemCartProducts }
      return newRemoveState

    default: return state
  }
}

function checkCart(state, product) {
  const cartProducts = [...state.cart]
  let returnValue = -1;

  if (cartProducts.length > 0) {
    cartProducts.forEach(cProd => {
      if (cProd.SKU === product.SKU) {
        if (product.onstock > cProd.ordered) {
          returnValue = 1;
        } else {
          returnValue = 0;
        }
      }
    })
  }
  //vagy a Cart üres, vagy a termék nincs benne 
  return returnValue;
}

function SKUgenerator(name) {
  const tempArr = name.split(" ");
  let value = "";
  tempArr.forEach(element => {
    value += element.substr(0, 1).toUpperCase();
  });
  return value
}

function getQueryVariable() {
  let retVal = window.location.search.substring(1);
  let val = retVal.split('=');
  return val[1]
}

function App() {
  return (
    <div className="container">
      <Provider store={store}>
        <BrowserRouter>
          <Header />

          <Switch>
            <Route path="/productpage" render={() => <ProductPage ind={getQueryVariable()} />} />
            <Route path="/cart">
              <p>Cart page</p>
              <Link to="/checkout">Checkout</Link>
            </Route>
            <Route path="/checkout">
              <p>Checkout page</p>
            </Route>
            <Route path="/">
              <Offerings className="offerings" offer_images={prodOffers}/>
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

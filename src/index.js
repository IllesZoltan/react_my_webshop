import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { createStore } from 'redux'
import { Provider } from 'react-redux'


let initialState = undefined



const store = createStore(reducer);

const url = "http://localhost:7000/database";

const data = fetch(url, {
  method: 'GET',
  headers: { 'Content-type': 'application/json' }
});


data.then((response) => {
  return response.json();
}).then((value) => {

  store.dispatch({ type: 'DATA_LOAD', value })

  console.log('App data: ', value.name);
});

function reducer(state = initialState, action) {

  switch (action.type) {
    case 'DATA_LOAD':
      return action.value

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
          if (cartElem.ordered < 1) {
            const ind = newRemCartProducts.findIndex(elem => elem.SKU === action.product.SKU)
            newRemCartProducts.splice(ind, 1)
          }
        }
      })
      const newRemoveState = { ...state, cart: newRemCartProducts }
      return newRemoveState

    case 'CLEAR_CART':
      const newEmptyCartState = { ...state, cart: [] }
      return newEmptyCartState

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

ReactDOM.render(
  <Provider store={store}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Provider>,
  document.getElementById('root')
);
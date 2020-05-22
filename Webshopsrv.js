const express = require('express');
const cors = require('cors')
const app = express();
const port = 7000

app.use(express.json());
app.use(express.urlencoded({extended: true}))
app.use(cors())

const DB = {
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
        foo: "Mobile Phone foo",
        bar: "Mobile Phone bar",
        baz: "Mobile Phone baz"
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
        foo: "I Phone foo",
        bar: "I Phone bar",
        baz: "I Phone baz"
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
        foo: "Tele Phone foo",
        bar: "Tele Phone bar",
        baz: "Tele Phone baz"
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

function SKUgenerator(name) {
    const tempArr = name.split(" ");
    let value = "";
    tempArr.forEach(element => {
      value += element.substr(0, 1).toUpperCase();
    });
    return value
  }

app.get('/database', (req,res) => {
    //res.send(JSON.stringify(DB))
    res.json(DB)
})

app.listen(port,() => console.log('Webshopsrv.js runs on port '+port));
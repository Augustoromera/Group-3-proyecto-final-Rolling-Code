import React, { useEffect, useState } from 'react';

function ShoppingComponent() {
  const [listCards, setListCards] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalCount, setTotalCount] = useState(0);

  const products = [
    {
      id: 1,
      name: 'PRODUCT NAME 1',
      image: 'https://s3-eu-central-1.amazonaws.com/www.burgerking.com.ar.v2/wp-media-folder-burger-king-argentina//home/ubuntu/preview/menu-app/frontend/apps/marketing-website-wordpress-app/web/app/uploads/sites/5/Papas-Cheddar-y-Bacon.png',
      price: 120000,
    },
    
  ];

  useEffect(() => {
    const openShopping = () => {
      document.body.classList.add('active');
    };
    const closeShopping = () => {
      document.body.classList.remove('active');
    };

    document.querySelector('.shopping').addEventListener('click', openShopping);
    document.querySelector('.closeShopping').addEventListener('click', closeShopping);

    return () => {
      document.querySelector('.shopping').removeEventListener('click', openShopping);
      document.querySelector('.closeShopping').removeEventListener('click', closeShopping);
    };
  }, []);

  useEffect(() => {
    initApp();
  }, []);

  const initApp = () => {
    products.forEach((value, key) => {
      let newDiv = document.createElement('div');
      newDiv.classList.add('item');
      newDiv.innerHTML = `
          <img src="image/${value.image}" alt="${value.name}">
          <div class="title">${value.name}</div>
          <div class="price">${value.price.toLocaleString()}</div>
          <button onClick={() => addToCard(key)}>Add To Card</button>`;
      document.querySelector('.list').appendChild(newDiv);
    });
  };

  const addToCard = (key) => {
    if (listCards[key] == null) {
      // copy product form list to list card
      listCards[key] = { ...products[key] };
      listCards[key].quantity = 1;
    }
    reloadCard();
  };

  const reloadCard = () => {
    const newTotalPrice = listCards.reduce((total, value) => total + (value?.price || 0), 0);
    const newTotalCount = listCards.reduce((count, value) => count + (value?.quantity || 0), 0);

    setListCards([...listCards]);
    setTotalPrice(newTotalPrice);
    setTotalCount(newTotalCount);
  };

  const changeQuantity = (key, quantity) => {
    if (quantity === 0) {
      delete listCards[key];
    } else {
      listCards[key].quantity = quantity;
      listCards[key].price = quantity * products[key].price;
    }
    reloadCard();
  };

  return (
    <div>
      <button className="shopping">Abrir Carrito</button>
      <button className="closeShopping">Cerrar Carrito</button>
      <div className="list" />
      <div className="listCard" />
      <div className="cart-total">
        <h3>Total:</h3>
        <span className="total-pagar">${totalPrice}</span>
      </div>
      <div className="quantity">{totalCount}</div>
    </div>
  );
}

export default ShoppingComponent;

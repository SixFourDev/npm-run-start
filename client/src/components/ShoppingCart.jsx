import React from 'react';
import { useShoppingCart } from 'use-shopping-cart';

function ShoppingCart() {
  const {
    cartDetails,
    incrementItem,
    decrementItem,
    removeItem,
  } = useShoppingCart();

  return (
    <div>
      <h2>Shopping Cart</h2>
      <ul>
        {Object.values(cartDetails).map((item) => (
          <li key={item.sku}>
            {item.name} - {item.formattedValue}
            <button onClick={() => incrementItem(item.sku)}>+</button>
            <button onClick={() => decrementItem(item.sku)}>-</button>
            <button onClick={() => removeItem(item.sku)}>Remove</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ShoppingCart;
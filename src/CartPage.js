import React from 'react';

const CartPage = ({ cartItems, removeFromCart, total }) => {
  const cartItemIds = Object.keys(cartItems);

  const handleCheckout = () => {
    alert('Proceeding to Checkout');
  };

  return (
    <div className="cart-page">
      <h1 className='cart-heading'>Shopping Cart</h1>
      {cartItemIds.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          <div className="cart-items">
            {cartItemIds.map((itemId) => {
              const item = cartItems[itemId];
              return (
                <div key={item.id} className="cart-item">
                  <img src={item.image} alt={item.title} />
                  <div className="item-details">
                    <h3>{item.title}</h3>
                    <p>Price: ${item.price}</p>
                    <p>Quantity: {item.quantity}</p>
                    <button className='remove' onClick={() => removeFromCart(item)}><i className='fas fa-trash'></i> Remove</button>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="cart-total">
            <h3>Total: ${total.toFixed(2)}</h3>
            <button className='checkout' onClick={handleCheckout}>Proceed to Checkout</button>
          </div>
        </>
      )}
    </div>
  );
};

export default CartPage;

import { useState } from 'react';


const CartPage = ({ cartItems, removeFromCart, addToCart, total }) => {
  const cartItemIds = Object.keys(cartItems);
  const [cartMessage, setCartMessage] = useState('');

  const handleCheckout = () => {
    alert('Proceeding to Checkout');
  };

  // Function to handle adding items to the cart
  const handleRemoveFromCart = (item) => {
    if (item.quantity > 1) {
      removeFromCart(item);
      setCartMessage(<div className="cart-message-minus"><i className='fas fa-minus'></i> Removed Item</div>);
    } else {
      removeFromCart(item);
      setCartMessage(<div className="cart-message-minus"><i className='fas fa-trash'></i> Removed from Cart</div>);
    }
    setTimeout(() => {
      setCartMessage('');
    }, 1000);
  };

  // Function to handle adding items to the cart
  const handleAddToCart = (item) => {
    addToCart(item);
    setCartMessage(<div className="cart-message"><i className='fas fa-plus'></i> Added Item</div>);
    setTimeout(() => {
      setCartMessage('');
    }, 1000);
  };

  const handleRemoveBtn = (item) => {
    if (item.quantity > 1) {
      return <i className='fas fa-minus'></i>
    } else {
      return <i className='fas fa-trash'></i>
    }
  }

  return (
    <div className="cart-page">
      <h1 className='cart-heading'>My Cart</h1>
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
                    <p>Category: {item.category}</p>
                    <p>Price: ${item.price}</p>
                    <div className="quantity-btns">

                      <button className='quantity-btn minus' onClick={(e) => {
                        e.stopPropagation();
                        handleRemoveFromCart(item);
                      }}> {handleRemoveBtn(item)
                      }</button>

                      <span className="quantity">{item.quantity}</span>
                      <button className='quantity-btn plus' onClick={(e) => {
                        e.stopPropagation();
                        handleAddToCart(item);
                      }}><i className='fas fa-plus'></i></button>
                    </div>
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

      {/* Display the cart message */}
      {cartMessage && <div>{cartMessage}</div>}
    </div>
  );
};

export default CartPage;

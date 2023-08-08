import React, { useState }  from 'react';
import { getRatingColor } from './HomePage';

const ProductModal = ({ showModal, selectedProduct, addToCart, setShowModal }) => {
  const [cartMessage, setCartMessage] = useState('');
  if (!showModal || !selectedProduct) return null;
  


  // Function to handle adding items to the cart
  const handleAddToCart = (item) => {
    addToCart(item);
    setCartMessage(' Added to cart');
    console.log('added')
    setTimeout(() => {
      setCartMessage('');
    }, 1000); 
  };


  return (
    <div className="modal-overlay">
      <div className="modal">
        <div className="modal-header">
          <h3>{selectedProduct.title}</h3>
          <button onClick={() => setShowModal(false)}><i className='fas fa-times'></i></button>
        </div>
        <div className="modal-body">
        <div className="product-rating-modal" ><span style={{ color: getRatingColor(selectedProduct.rating.rate) }}>
              {selectedProduct.rating.rate} <i className='fas fa-star'></i></span> <span style={{ color: "grey"}}> &nbsp; {selectedProduct.rating.count}</span>
            </div>
          <img src={selectedProduct.image} alt={selectedProduct.title} />
          <table className='productTable'> 
            <tbody>
              <tr><th>Category</th><td>{selectedProduct.category}</td></tr>
              <tr><th>Description</th><td>{selectedProduct.description}</td></tr>
              <tr><th>Price</th><td>${selectedProduct.price}</td></tr>
            </tbody>
          </table>
          <button className='addToCartButtonModal'
            onClick={() => {
              handleAddToCart(selectedProduct);
              setShowModal(true);
            }}
          >
            Add to Cart
          </button>
        </div>
      </div>
      {cartMessage && <div className="cart-message"><i className='fas fa-check'></i>{cartMessage}</div>}
    </div>
  );
};

export default ProductModal;
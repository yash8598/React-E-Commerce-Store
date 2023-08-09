import React, { useState } from 'react';
import { getRatingColor } from './HomePage';

const ProductModal = ({ showModal, selectedProduct, addToCart, setShowModal, cartItems }) => {
  const [cartMessage, setCartMessage] = useState('');

  // Function to handle adding items to the cart
  const handleAddToCart = (item) => {
    addToCart(item);
    setCartMessage('Added to cart');
    setTimeout(() => {
      setCartMessage('');
    }, 1000);
  };

  if (!showModal || !selectedProduct) return null;

  return (
    <div className="modal show d-flex">
        <div className="modal-content m-auto">
          <div className="modal-header">
            <h3 className="modal-title">{selectedProduct.title}</h3>
            <button type="button" className="close" onClick={() => setShowModal(false)}>
              <span><i className='fas fa-times'></i></span>
            </button>
          </div>
          <div className="modal-body">
            <div className="product-rating-modal">
              <span style={{ color: getRatingColor(selectedProduct.rating.rate) }}>
                {selectedProduct.rating.rate} <i className="fas fa-star"></i>
              </span>{' '}
              <span style={{ color: 'grey' }}> &nbsp; {selectedProduct.rating.count}</span>
            </div>
            <img src={selectedProduct.image} alt={selectedProduct.title} className="img-fluid mb-3" />
            <table className="table table-bordered">
              <tbody>
                <tr>
                  <th>Category</th>
                  <td>{selectedProduct.category}</td>
                </tr>
                <tr>
                  <th>Description</th>
                  <td>{selectedProduct.description}</td>
                </tr>
                <tr>
                  <th>Price</th>
                  <td>${selectedProduct.price}</td>
                </tr>
              </tbody>
            </table>
            <button
              className="btn btn-primary btn-block"
              onClick={() => {
                handleAddToCart(selectedProduct);
                setShowModal(true);
              }}
            >
              {cartItems[selectedProduct.id] && cartItems[selectedProduct.id].quantity > 0
              ? 'Add More'
              : 'Add to Cart'}
            </button>
          </div>
        </div>
      {cartMessage && <div className="cart-message"><i className="fas fa-check"></i>{cartMessage}</div>}
    </div>
  );
};

export default ProductModal;

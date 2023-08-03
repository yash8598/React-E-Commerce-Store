import React from 'react';
import { getRatingColor } from './HomePage';

const ProductModal = ({ showModal, selectedProduct, addToCart, setShowModal }) => {
  if (!showModal || !selectedProduct) return null;

  return (
    <div className="modal-overlay" onClick={() => setShowModal(false)}>
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
              addToCart(selectedProduct);
              setShowModal(false);
            }}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductModal;

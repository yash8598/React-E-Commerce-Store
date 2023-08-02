import React from 'react';

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
          <img src={selectedProduct.image} alt={selectedProduct.title} />
          <p>Category: {selectedProduct.category}</p>
          <p>Product Details: {selectedProduct.description}</p>
          <p>Price: ${selectedProduct.price}</p>
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

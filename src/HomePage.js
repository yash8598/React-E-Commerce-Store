import React, { useState, useEffect } from 'react';
import ProductModal from './ProductModal';

// Function to get the color based on the rating value
export const getRatingColor = (rating) => {
  if (rating >= 0 && rating < 1) {
    return '#ff0000';
  } else if (rating >= 1 && rating < 2) {
    return '#ff6600'; 
  } else if (rating >= 2 && rating < 3) {
    return '#ffd700'; 
  } else if (rating >= 3 && rating < 4) {
    return '#90ee90';
  } else if (rating >= 4 && rating <= 5) {
    return '#008000'; 
  } else {
    return '#808080'; 
  }
};

const HomePage = ({ products, addToCart, cartItems }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [cartMessage, setCartMessage] = useState('');
  const [searchInput, setSearchInput] = useState('');

  useEffect(() => {
    // Filter products based on the selected category
    if (searchInput.trim() !== '') {
      const searchTerms = searchInput.toLowerCase().split(/\s+/);

      const filteredItems = products.filter((product) => {
        const category = product.category.toLowerCase();
        return searchTerms.every((term) => category.split(/\s+/).includes(term));
      });

      setFilteredProducts(filteredItems);
    } else {
      setFilteredProducts(products);
    }
  }, [searchInput, products]);
    
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredProducts.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  const handleNextPage = () => {
    const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
    if (currentPage < totalPages) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  const handleProductCardClick = (product) => {
    setShowModal(true);
    setSelectedProduct(product);
  };

  const handleAddToCart = (item) => {
    addToCart(item);
    setCartMessage(<div className="cart-message"><i className='fas fa-check'></i> Added to Cart</div>);
    setTimeout(() => {
      setCartMessage('');
    }, 1000); 
  };



  

  const handleSearchClick = () => {
    const searchTerms = searchInput.toLowerCase().split(/\s+/);
    const filteredItems = products.filter((product) => {
      const category = product.category.toLowerCase();
      return searchTerms.every((term) => category.split(/\s+/).includes(term));
    });
    setFilteredProducts(filteredItems);
    setCurrentPage(1);
  };

  return (
    <div className="homepage">
      <h1 className="heading">Welcome to E-commerce Store</h1>
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search by category "
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
        />
        <button className='btn btn-secondary' onClick={handleSearchClick}>
          <i className="fas fa-search"></i> Search
        </button>
      </div>
      <div className="product-list">
        {currentItems.map((product) => (
          <div
            key={product.id}
            className="product d-flex justify-content-around align-items-center flex-column"
            onClick={() => handleProductCardClick(product)}
          >
            <div className="product-rating">
              <span style={{ color: getRatingColor(product.rating.rate) }}>
                {product.rating.rate} <i className="fas fa-star"></i>
              </span>
            </div>
            <img src={product.image} alt={product.title} />
            <h3>{product.title}</h3>
            <p>Category: {product.category}</p>
            <p>Price: ${product.price}</p>
            <button
              className="addToCartButton btn btn-primary"
              onClick={(e) => {
                e.stopPropagation();
                handleAddToCart(product);
              }}
            >
              {cartItems[product.id] && cartItems[product.id].quantity > 0
              ? 'Add More'
              : 'Add to Cart'}
            </button>
          </div>
        ))}
      </div>
      <div className="pagination">
        <button className='btn btn-secondary' onClick={handlePreviousPage} disabled={currentPage === 1}>
          Previous
        </button>
        {Array.from({ length: Math.ceil(filteredProducts.length / itemsPerPage) }, (_, i) => i + 1).map((pageNumber) => (
          <span
            key={pageNumber}
            onClick={() => paginate(pageNumber)}
            className={currentPage === pageNumber ? 'btn btn-dark active' : 'btn btn-secondary'}
          >
            {pageNumber}
          </span>
        ))}
        <button className='btn btn-secondary'
          onClick={handleNextPage}
          disabled={currentPage === Math.ceil(filteredProducts.length / itemsPerPage)}
        >
          Next
        </button>
      </div>

      {/* Modal */}
      <ProductModal
        showModal={showModal}
        selectedProduct={selectedProduct}
        addToCart={addToCart}
        setShowModal={setShowModal}
        cartItems={cartItems}
      />

      {/* Display the cart message */}
      {cartMessage && <div>{cartMessage}</div>}
    </div>
  );
};

export default HomePage;

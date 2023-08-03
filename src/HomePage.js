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


const HomePage = ({ products, addToCart }) => {
  const [currentPage, setCurrentPage] = useState(1); 
  const [itemsPerPage] = useState(10);
  const [searchCategory, setSearchCategory] = useState('');
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    // Filter products based on the selected category
    if (searchCategory.trim() !== '') {
      // Split search term into individual words
      const searchTerms = searchCategory.toLowerCase().split(/\s+/);

      // Filter products based on search terms
      const filteredItems = products.filter((product) => {
        const category = product.category.toLowerCase();
        return searchTerms.every((term) => category.split(/\s+/).includes(term));
      });

      setFilteredProducts(filteredItems);
    } else {
      setFilteredProducts(products);
    }
  }, [searchCategory, products]);

  // Get current items to display on the current page
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredProducts.slice(indexOfFirstItem, indexOfLastItem);

  // Change page number
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Function to handle the search button click
  const handleSearch = () => {
    if (searchCategory.trim() !== '') {
      const searchTerms = searchCategory.toLowerCase().split(/\s+/);
      const filteredItems = products.filter((product) => {
        const category = product.category.toLowerCase();
        return searchTerms.every((term) => category.split(/\s+/).includes(term));
      });
      setFilteredProducts(filteredItems);
    } else {
      setFilteredProducts(products);
    }
    setCurrentPage(1); // Reset current page to 1 after search
  };

  // Function to handle previous page
  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  // Function to handle next page
  const handleNextPage = () => {
    const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
    if (currentPage < totalPages) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  // Function to handle the click on the product card
  const handleProductCardClick = (product) => {
    setShowModal(true);
    setSelectedProduct(product);
  };



  return (
    <div className="homepage">
      <h1 className="heading">Welcome to E-commerce Store</h1>
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search by category..."
          value={searchCategory}
          onChange={(e) => setSearchCategory(e.target.value)}
        />
        <button onClick={handleSearch}>
          <i className="fas fa-search"></i> Search
        </button>
      </div>
      <div className="product-list">
        {currentItems.map((product) => (
          <div
            key={product.id}
            className="product"
            onClick={() => handleProductCardClick(product)} 
          >
            <div className="product-rating" ><span style={{ color: getRatingColor(product.rating.rate) }}>
              {product.rating.rate} <i className='fas fa-star'></i></span> 
            </div>
            <img src={product.image} alt={product.title} />
            <h3>{product.title}</h3>
            <p>Category: {product.category}</p>
            <p>Price: ${product.price}</p>
            <button className="addToCartButton" onClick={(e) => { e.stopPropagation(); addToCart(product); }}>
              Add to Cart
            </button>
          </div>
        ))}
      </div>
      <div className="pagination">
        <button onClick={handlePreviousPage} disabled={currentPage === 1}>
          Previous
        </button>
        {Array.from({ length: Math.ceil(filteredProducts.length / itemsPerPage) }, (_, i) => i + 1).map((pageNumber) => (
          <span
            key={pageNumber}
            onClick={() => paginate(pageNumber)}
            className={currentPage === pageNumber ? 'active' : ''}
          >
            {pageNumber}
          </span>
        ))}
        <button
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
      />
    </div>
  );
};

export default HomePage;
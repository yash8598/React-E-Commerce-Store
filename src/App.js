import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
import HomePage from './HomePage';
import CartPage from './CartPage';
import ProductModal from './ProductModal';

const App = () => {
  const [products, setProducts] = useState([]);
  const [cartItems, setCartItems] = useState({});
  const [cartMessage, setCartMessage] = useState('');

  useEffect(() => {
    // Fetch the list of products from the FakestoreAPI
    fetch('https://fakestoreapi.com/products')
      .then((response) => response.json())
      .then((data) => {
        // Add 'quantity' property to each product in the initial state
        const productsWithQuantity = data.reduce((acc, product) => {
          return { ...acc, [product.id]: { ...product, quantity: 0 } };
        }, {});
        setProducts(productsWithQuantity);
      })
      .catch((error) => console.error('Error fetching products:', error));
  }, []);

  // Function to handle adding items to the cart
  const addToCart = (item) => {
    setCartItems((prevCartItems) => {
      const updatedCartItems = { ...prevCartItems };
      updatedCartItems[item.id] = {
        ...item,
        quantity: updatedCartItems[item.id] ? updatedCartItems[item.id].quantity + 1 : 1,
      };
      return updatedCartItems;
    });
  };

  // Function to handle removing items from the cart
  const removeFromCart = (itemToRemove) => {
    setCartItems((prevCartItems) => {
      const updatedCartItems = { ...prevCartItems };
      if (updatedCartItems[itemToRemove.id].quantity > 1) {
        updatedCartItems[itemToRemove.id].quantity -= 1;
      } else {
        delete updatedCartItems[itemToRemove.id];
      }
      return updatedCartItems;
    });
  };

  // Function to calculate the total price of items in the cart
  const calculateTotalPrice = () => {
    return Object.values(cartItems).reduce((total, item) => total + item.price * item.quantity, 0);
  };

  // Get the total quantity of items in the cart
  const totalQuantity = Object.values(cartItems).reduce((total, item) => total + item.quantity, 0);

  return (
    <Router>
      <header>
        <nav>
          <ul className='navbar'>
            <li><Link className='home' to="/"><i className='fas fa-store'></i> Ecommerce</Link></li>
            <li>
              <Link className='cart' to="/cart">
                <i className='fas fa-shopping-cart'></i> Cart
                {totalQuantity > 0 && <span className="cart-badge">{totalQuantity}</span>}
              </Link>
            </li>
          </ul>
        </nav>
      </header>
      <div className="app">
        <main>
          <Routes>
            {/* Homepage route */}
            <Route exact path="/" element={<HomePage products={Object.values(products)} addToCart={addToCart} removeFromCart={removeFromCart} cartMessage={cartMessage} />} />
            {/* Shopping cart route */}
            <Route path="/cart" element={<CartPage
              cartItems={cartItems}
              removeFromCart={removeFromCart}
              addToCart={addToCart}
              total={calculateTotalPrice()}
            />} />
          </Routes>
        </main>
      </div>
      {/* Modal */}
      <ProductModal
        addToCart={addToCart}
        removeFromCart={removeFromCart}
        cartMessage={cartMessage}
        setCartMessage={setCartMessage}
      />
    </Router>
  );
};

export default App;

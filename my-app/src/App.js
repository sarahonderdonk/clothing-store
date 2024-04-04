import './App.css';
import { useState } from "react";
import clothingData from "./assets/clothing.json";
import ClothingItem from "./components/ClothingItem";
import "./App.css";

/* ####### DO NOT TOUCH -- this makes the image URLs work ####### */
clothingData.forEach((item) => {
  item.image = process.env.PUBLIC_URL + "/" + item.image;
});
/* ############################################################## */

function App() {

  //sets up cart, price sorting, and filters
  const [cartItems, setCartItems] = useState([]);
  const [sortByPrice, setSortByPrice] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState(["Pants", "Shirts", "Men's", "Women's"]); 

  //defines when something is added to cart
  const addToCart = (item) => {
    setCartItems([...cartItems, item]);
  };

  //defines when sort by price is turned on and off
  const toggleSortByPrice = () => {
    setSortByPrice(!sortByPrice);
  };

  //defines handling filter changes
  const handleFilterChange = (event) => {
    const filter = event.target.value;
    if (selectedFilters.includes(filter)) {
      setSelectedFilters(selectedFilters.filter(f => f !== filter));
    } else {
      setSelectedFilters([...selectedFilters, filter]);
    }
  };

  //resets the filters
  const resetFilters = () => {
    setSelectedFilters(["Pants", "Shirts", "Men's", "Women's"]);
    setSortByPrice(false);

  };

  //clears the cart
  const clearCart = () => {
    setCartItems([]);
  };

  //defines how filters relate to what is shown
  const filterMatches = (item) => {
    if (selectedFilters.length === 0) {
      return false;
    }
    return selectedFilters.includes(item.type) && selectedFilters.includes(item.gender);
  };

  //allows sorting to be done with filtering
  const filteredAndSortedClothingData = clothingData.filter(filterMatches).sort((a, b) => {
    return sortByPrice ? a.price - b.price : b.price - a.price;
  });

  //removes item from cart
  const removeItemFromCart = (index) => {
    const updatedCartItems = [...cartItems];
    updatedCartItems.splice(index, 1);
    setCartItems(updatedCartItems);
  };

  return (
    <div className="App">
      <h1>Sarah's Shop</h1>
      <div className="filter-container">
        <h3>Show:</h3>
        <div>
          <label>
            <input type="checkbox" value="Pants" onChange={handleFilterChange} checked={selectedFilters.includes("Pants")} />
            Pants
          </label>
        </div>
        <div>
          <label>
            <input type="checkbox" value="Shirts" onChange={handleFilterChange} checked={selectedFilters.includes("Shirts")} />
            Shirts
          </label>
        </div>
        <div>
          <label>
            <input type="checkbox" value="Men's" onChange={handleFilterChange} checked={selectedFilters.includes("Men's")} />
            Men's
          </label>
        </div>
        <div>
          <label>
            <input type="checkbox" value="Women's" onChange={handleFilterChange} checked={selectedFilters.includes("Women's")} />
            Women's
          </label>
        </div>
        <button onClick={resetFilters}>Reset Sort and Filters</button>
      </div>
      <div className="sort-button-container">
        <button onClick={toggleSortByPrice}>
          {sortByPrice ? "Reset Sorting" : "Sort by Price (Low to High)"}
        </button>
      </div>
      <div className="clothing-items-container">
        {filteredAndSortedClothingData.map((item, index) => (
          <ClothingItem key={index} item={item} addToCart={addToCart} />
        ))}
      </div>
      <div className="cart-container">
        <h2>Cart ({cartItems.length} items)</h2>
        <button onClick={clearCart}>Clear Cart</button> 
        <ul>
          {cartItems.map((item, index) => (
            <li key={index}>
              <img src={item.image} alt={item.title} className="cart-item-image"/> 
              <div>
                <p>{item.title}</p> 
                <p>Price: ${item.price.toFixed(2)}</p>
                <button onClick={() => removeItemFromCart(index)}>Remove from Cart</button>
              </div>
            </li>
          ))}
        </ul>
        <p>Total Price: ${cartItems.reduce((acc, item) => acc + item.price, 0).toFixed(2)}</p>
      </div>
    </div>
  );
}

export default App;
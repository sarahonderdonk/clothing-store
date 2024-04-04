import React from "react";

//defines an clothing item object
const ClothingItem = ({ item, addToCart }) => {
    return (
      <div className="clothing-item">
        <img src={process.env.PUBLIC_URL + item.image} alt={item.title} />
        <div>
          <h3>{item.title}</h3>
          <p>{item.description}</p>
          <p>Price: ${item.price}</p>
          <p>Type: {item.type}</p>
          <p>Gender: {item.gender}</p>
          <button onClick={() => addToCart(item)}>Add to Cart</button>
        </div>
      </div>
    );
  };
  
  export default ClothingItem;
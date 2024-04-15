// App.js
import React, { useState } from "react";
import axios from "axios";
import { products } from "./products";

function App() {
  // Initializing state variables 
  const [selectedItems, setSelectedItems] = useState([]);
  const [packages, setPackages] = useState([]);

  // This function handles the checkbox change event.
  const handleCheckboxChange = (event) => {
    const itemName = event.target.name;
    const isChecked = event.target.checked;
    const item = products.find((product) => product.name === itemName);

    if (isChecked) {
      setSelectedItems([...selectedItems, item]);
    } else {
      setSelectedItems(
        selectedItems.filter((selectedItem) => selectedItem.name !== itemName)
      );
    }
  };

  // This function handles the place order button click.
  const handlePlaceOrder = async () => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/place-order",
        { selectedItems }
      );
      setPackages(response.data.packages);
    } catch (error) {
      console.error("Error placing order:", error);
    }
  };

  return (
    <main className="container mx-auto p-3 px-10 md:px-0 grid grid-cols-1 sm:grid-cols-2">
      <div className="">
        <h1 className="font-bold text-3xl my-6 text-center">Product List</h1>
        <ul className="md:w-[40%]  mx-auto ">
          {/* Showing all the products list */}
          {products.map((product) => (
            <li key={product.name}>
              <input
                type="checkbox"
                name={product.name}
                onChange={handleCheckboxChange}
                id={product.name}
              />
              <label className="text-sm" for={product.name}>
                {`${product.name} - Price: $${product.price} - Weight: ${product.weight}g`}
              </label>
            </li>
          ))}
        </ul>
        <button
          onClick={handlePlaceOrder}
          className="bg-black text-white rounded-xl px-3 py-1 w-1/2 mx-auto my-5 flex justify-center items-center"
        >
          Place Order
        </button>
      </div>

      <div>
        <h2 className="font-bold text-3xl my-6">Result</h2>
        <div className="my-4">
          {/* Showing the result packages */}
          {packages.length > 0 ? (
            packages.map((pkg, index) => (
              <div
                key={index}
                className="mb-6 bg-gray-100 shadow-lg hover:shadow-xl transition-all  p-2 rounded-md w-1/2 "
              >
                <h3 className="font-bold mb-1">Package {index + 1}</h3>
                <p>Items: {pkg.items.map((item) => item.name).join(", ")}</p>
                <p>Total weight: {pkg.totalWeight}g</p>
                <p>Total price: ${pkg.totalPrice}</p>
                <p>Courier price: ${pkg.courierPrice}</p>
              </div>
            ))
          ) : (
            <div>Choose products.</div>
          )}
        </div>
      </div>
    </main>
  );
}

export default App;

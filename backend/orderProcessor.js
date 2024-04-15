import { calculateCourierCharge } from './courier.js';

export const processOrder = (selectedItems) => {
  //  sorting the selectedItems array in ascending order based on the weight property of each item.
  selectedItems.sort((a, b) => a.weight - b.weight);

  const packages = [];
  let currentPackage = { items: [], totalWeight: 0, totalPrice: 0, courierPrice: 0 };

  // iterates over each item in the selectedItems array 
  selectedItems.forEach(item => {
    const itemWeight = item.weight;
    const itemPrice = item.price;

    //checks if adding the current item to the current package would exceed weight or price limits. If it does, the current package is pushed to the packages array, and a new currentPackage object is initialized.
    if (currentPackage.totalPrice + itemPrice > 250 || currentPackage.totalWeight + itemWeight > 5000) {
      packages.push(currentPackage);
      currentPackage = { items: [], totalWeight: 0, totalPrice: 0, courierPrice: 0 };
    }

    // add the current item to the currentPackage, updating the total weight, total price, and calculating the courier price
    currentPackage.items.push({ name: item.name });
    currentPackage.totalWeight += itemWeight;
    currentPackage.totalPrice += itemPrice;
    currentPackage.courierPrice = calculateCourierCharge(currentPackage.totalWeight);
  });

  //  checks if there are any items in the currentPackage. If there are, it pushes the currentPackage to the packages array.
  if (currentPackage.items.length > 0) {
    packages.push(currentPackage);
  }

  return packages;
};


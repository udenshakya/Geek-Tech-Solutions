export const calculateCourierCharge = (weight) => {
  if (weight <= 200) {
    return 5;
  } else if (weight <= 500) {
    return 10;
  } else if (weight <= 1000) {
    return 15;
  } else if (weight <= 5000) {
    return 20;
  } else {
    return null;
  }
};


/* eslint-disable  @typescript-eslint/no-explicit-any */
// Select product with lowest price
const selectMin = (products) => {
  if (!products || products.length === 0) return 0;
  let low = products[0];

  for (let i = 0; i < products.length; i++) {
    if (products[i].price < low.price) {
      low = products[i];
    }
  }

  return Math.floor(low.price);
};

export default selectMin;

/* eslint-disable  @typescript-eslint/no-explicit-any */
// Select product with highest price
const selectMax = (products) => {
  if (!products || products.length === 0) return 0;

  let high = products[0];

  for (let i = 0; i < products.length; i++) {
    if (products[i].price > high.price) {
      high = products[i];
    }
  }

  return Math.floor(high.price);
};

export default selectMax;

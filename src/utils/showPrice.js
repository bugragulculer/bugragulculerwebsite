const showPrice = (item) => {
  let lowest = Number.POSITIVE_INFINITY;
  let highest = Number.NEGATIVE_INFINITY;
  let tmp = "";

  for (let i = item.variants.length - 1; i >= 0; i--) {
    tmp = item.variants[i].price;
    if (tmp < lowest) lowest = tmp;
    if (tmp > highest) highest = tmp;
  }

  return { highest, lowest };
};

export default showPrice;

/* eslint-disable  @typescript-eslint/no-explicit-any */
import { showPrice } from ".";

const selectFilter = (products, filter) => {
  if (!products.items || products.items.length === 0) return [];
  //console.log(products.items)
  return products.items
    .filter((product) => {
      const matchColor =
        filter.color === ""
          ? true
          : product.variants
          ? product.variants.find(
              (variant) => variant.color.toLowerCase() === filter.color
            )
          : true;
      const matchType = product.type
        ? product.type.toLowerCase().includes(filter.type)
        : true;
      const isInRange = product.variants
        ? showPrice(product).lowest >= parseInt(filter.minPrice, 10) &&
          showPrice(product).lowest <= parseInt(filter.maxPrice, 10)
        : true;
      return matchColor && matchType && isInRange;
    })
    .sort((a, b) => {
      if (filter.sortBy === "name-desc") {
        return a.name > b.name ? 1 : -1;
      } else if (filter.sortBy === "name-asc") {
        return a.name < b.name ? 1 : -1;
      } else if (filter.sortBy === "price-desc") {
        return showPrice(a).lowest < showPrice(b).lowest ? 1 : -1;
      }
      return showPrice(a).lowest > showPrice(b).lowest ? 1 : -1;
    });
};

export default selectFilter;

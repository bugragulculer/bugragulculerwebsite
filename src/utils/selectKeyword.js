/* eslint-disable  @typescript-eslint/no-explicit-any */
import { showPrice } from ".";

const selectKeyword = (products, filter) => {
  if (!products || products.length === 0) return [];
  const keyword = filter.keyword.toLowerCase();
  console.log(products);
  return products
    .filter((product) => {
      //const matchKeyword = product.keywords ? product.keywords.includes(keyword) : true;
      const matchName = product.name
        ? product.name.toLowerCase().includes(keyword)
        : true;
      const matchDescription = product.description
        ? product.description.toLowerCase().includes(keyword)
        : true;
      //console.log(matchKeyword)
      //console.log(matchName)
      console.log(matchDescription);
      return (
        //matchKeyword
        matchDescription || matchName
      );
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

export default selectKeyword;

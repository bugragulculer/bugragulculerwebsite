const sizeCounter = (item) => {
  const unique = [];
  const tempArr = [];

  item.variants.forEach((value) => {
    if (unique.indexOf(value.size) === -1) {
      unique.push(value.size);
      tempArr.push(value.id);
    }
  });
  const sizeLength = unique.length;
  const uniqueSizes = unique;

  return { sizeLength, uniqueSizes };
};

export default sizeCounter;

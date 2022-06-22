const colorCounter = (item) => {
  const unique = [];
  const tempArr = [];

  item.variants.forEach((value) => {
    if (unique.indexOf(value.color) === -1) {
      unique.push(value.color);
      tempArr.push(value.id);
    }
  });
  const colorLength = unique.length;
  const uniqueColors = unique;

  return { colorLength, uniqueColors };
};

export default colorCounter;

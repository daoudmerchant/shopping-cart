const organise = (() => {
  const orderBy = (() => {
    const ascendingPrice = (array) => {
      return [...array].sort((prevItem, thisItem) => {
        return (
          (prevItem.price || prevItem.lowestPrice) -
          (thisItem.price || thisItem.lowestPrice)
        );
      });
    };
    const descendingPrice = (array) => {
      return [...array].sort((prevItem, thisItem) => {
        return (
          (thisItem.price || thisItem.lowestPrice) -
          (prevItem.price || prevItem.lowestPrice)
        );
      });
    };
    const defaultOrder = (array) => {
      return [...array].sort((prevItem, thisItem) => {
        return prevItem.id - thisItem.id;
      });
    };
    return {
      ascendingPrice,
      descendingPrice,
      defaultOrder,
    };
  })();

  const filterBy = (() => {
    const category = (array, categoryName) => {
      return array.filter((item) => item.category === categoryName);
    };
    const inStock = (array) => {
      return array.filter((item) => item.inStock);
    };
    return {
      category,
      inStock,
    };
  })();
  return {
    orderBy,
    filterBy,
  };
})();

export default organise;

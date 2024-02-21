const filterDifferenceElements = (array1: string[], array2: string[]) => {
  // Lấy ra những phần tử khác biệt trong mảng 1 mà mảng 2 ko có
  const differenceArray1 = array1.filter(
    (item1) => !array2.some((item2) => item2 === item1)
  );

  // Lấy ra những phần tử khác biệt trong mảng 2 mà mảng 1 ko có
  const differenceArray2 = array2.filter(
    (item2) => !array1.some((item1) => item1 === item2)
  );

  return {
    differenceElement1: differenceArray1,
    differenceElement2: differenceArray2,
  };
};

export default filterDifferenceElements;

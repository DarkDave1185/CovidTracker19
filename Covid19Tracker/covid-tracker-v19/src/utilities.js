export const sortData = (data) => {
  const sortedData = [...data];
  /*condensed version below*/
  sortedData.sort((a, b) => {
    if (a.cases > b.cases) {
      return -1;
    } else {
      return 1;
    }
  });
  return sortedData;
};

/*--condensed code to 1 line--
return sortedData.sort((a, b) => (a.cases > b.cases ? -1 : 1)) */

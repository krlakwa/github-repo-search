const getDuration = (start, end) => {
  const delta = end - start;
  return `${delta / 1000}sec`;
};

export default getDuration;

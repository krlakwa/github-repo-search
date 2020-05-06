const getDuration = (start, end) => {
  if (!start || !end) return '';
  if (typeof start !== 'number' || typeof end !== 'number') return undefined;

  const delta = end - start;
  return `${delta / 1000}sec`;
};

export default getDuration;

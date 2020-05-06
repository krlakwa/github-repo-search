const getPaginationValues = item => {
  if (typeof item !== 'string' || !item.length) return [];
  const [, url, text] = item.split(/[<>]/);
  const [, textFormatted] = text.split(/[""]/);
  return [url, textFormatted];
};

export default getPaginationValues;

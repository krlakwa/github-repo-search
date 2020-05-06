const getPaginationValues = item => {
  const [, url, text] = item.split(/[<>]/);
  const [, textFormatted] = text.split(/[""]/);
  return [url, textFormatted];
};

export default getPaginationValues;

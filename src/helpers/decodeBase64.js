const decodeBase64 = (str = '') => {
  return decodeURIComponent(
    atob(str)
      .split('')
      .map(character => `%${`00${character.charCodeAt(0).toString(16)}`.slice(-2)}`)
      .join('')
  );
};

export default decodeBase64;

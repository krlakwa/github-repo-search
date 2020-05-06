const getRelativeDate = (str1, str2) => {
  if (!str1) return undefined;
  const startDate = new Date(str1);
  const endDate = str2 ? new Date(str2) : new Date();

  const seconds = (endDate.getTime() - startDate.getTime()) / 1000;
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const months = Math.floor(days / 30);
  const years = Math.floor(days / 356.242199);

  const rtf = new Intl.RelativeTimeFormat('en', { numeric: 'auto' });

  if (years > 0) return rtf.format(-years, 'year');
  if (months > 0) return rtf.format(-months, 'month');
  if (days > 0) return rtf.format(-days, 'day');
  if (hours > 0) return rtf.format(-hours, 'hour');
  if (minutes > 0) return rtf.format(-minutes, 'minute');
  return rtf.format(-seconds, 'second');
};

export default getRelativeDate;

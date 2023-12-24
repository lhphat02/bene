export const shortener = (str, len) => {
  if (str.length > len) {
    return `${str.substring(0, len)}...`;
  }
  return str;
};

export function formatDate(date) {
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return new Date(date).toLocaleDateString('en-US', options);
}

export function getDayCount(checkinDate, checkoutDate) {
  const oneDay = 24 * 60 * 60 * 1000;

  const checkinTime = new Date(checkinDate).getTime();
  const checkoutTime = new Date(checkoutDate).getTime();

  const differenceInDays = Math.round(
    Math.abs((checkoutTime - checkinTime) / oneDay)
  );
  return differenceInDays;
}

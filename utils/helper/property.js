const getRandomHouseImage = () => {
  // Use Unsplash API to get a random house image
  const unsplashApiUrl = 'https://source.unsplash.com/featured/?house';
  return `${unsplashApiUrl}&${new Date().getTime()}`;
};

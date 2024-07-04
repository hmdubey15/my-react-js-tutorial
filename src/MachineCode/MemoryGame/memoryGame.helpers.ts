export const getRandomArrayForGame = (n: number) => {
  const arr = [];
  for (let i = 0; i < n * n; i++) arr[i] = i % (2 * n);

  // Shuffling Algorithm!
  for (let i = arr.length - 1; i >= 0; i--) {
    const j = Math.floor(i * Math.random());
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }

  return arr;
};

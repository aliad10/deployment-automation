export const getConstructorValues = (data) => {
  return Object.values(data)
    .sort((a, b) => a.order - b.order)
    .map((item) => item.value);
};

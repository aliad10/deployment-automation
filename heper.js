export const getConstructorValues = (data) => {
  return Object.values(data)
    .sort((a, b) => a.order - b.order)
    .map((item) => item.value);
};

export const getConstructorValue = (contractAddress) => {
  const contrctValue = contractAddress.split("0x")[1];
  console.log("contrctValue", contrctValue);

  return `0x19ab453c000000000000000000000000${contrctValue}`;
};

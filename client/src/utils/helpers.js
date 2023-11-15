export const formatName = (name) => {
  return name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
};

export const calculateTotal = (product, quantity, variations, variationQuantities) => {
  let total = 0;

  if (product.isVariable === false) {
    total = quantity * product.price;
  } else {
    variations.forEach((variation) => {
      const quantityForVariation = variationQuantities[variation.id] || 0;
      total += quantityForVariation * variation.price;
    });
  }

  return total;
};

export const randomPhoneNumber = () => {
  const phoneNumbers = [
    '+541131514574',
    '+541149472679',
    '+541128311122',
  ];
  const randomNumber = Math.floor(Math.random() * phoneNumbers.length);
  return phoneNumbers[randomNumber];
};
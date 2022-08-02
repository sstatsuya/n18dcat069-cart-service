const getProductInfo = `
query($productId: ID){
  product(id: $productId) {
     id
    name
    price
    sale
    sold
    rate
    type
    description
    splash
    images
  }
}
`;

module.exports = {
  getProductInfo,
};

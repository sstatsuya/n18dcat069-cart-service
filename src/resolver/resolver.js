const Cart = require("../model/Cart");
const { v4: uuidv4 } = require("uuid");
require("isomorphic-fetch");
const { getProductInfo } = require("../query/product");
const { URL } = require("../common/URL");

const resolvers = {
  Query: {
    userCart: async (parent, args) => {
      let userCartProductList = await Cart.find({ userId: args.userId });
      for (let i = 0; i < userCartProductList.length; i++) {
        let product = await fetch(URL.PRODUCT_SERVICE, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({
            query: getProductInfo,
            variables: {
              productId: userCartProductList[i].productId,
            },
          }),
        })
          .then((res) =>{
            return res.json()
          })
          .then((data) => {
            return data.data.product;
          });

          console.log(JSON.stringify(product))
        userCartProductList[i].data = {
          name: product.name,
          price: product.price,
          sale: product.sale,
          splash: product.splash,
        };
      }
      return userCartProductList;
    },
  },

  Mutation: {
    addUserCartProduct: async (parent, args) => {
      let userCart = await Cart.findOne({
        userId: args.userId,
        productId: args.productId,
      });
      if (userCart) {
        return {
          data: {
            isExist: true,
          },
        };
      }
      const cartProductId = uuidv4();
      const data = {
        id: cartProductId,
        userId: args.userId,
        productId: args.productId,
        quantity: 1,
      };
      const newCart = new Cart(data);
      await newCart.save();
      userCart = await Cart.findOne({ id: cartProductId });
      let cartProduct = await fetch(URL.PRODUCT_SERVICE, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          query: getProductInfo,
          variables: {
            productId: args.productId,
          },
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          return data.data.product;
        });
      userCart.data = {
        name: cartProduct.name,
        price: cartProduct.price,
        sale: cartProduct.sale,
        splash: cartProduct.splash,
      };
      return userCart;
    },

    deleteUserCartProduct: async (parent, args) => {
      const cart = await Cart.findOne({ id: args.id });
      if (cart) {
        const userId = cart.userId;
        await Cart.deleteOne({ id: args.id });
        return {
          data: {
            isSuccess: true,
          },
        };
      }
    },

    deleteUserCartProductList: async (parent, args) => {
      for (let i = 0; i < args.list.length; i++) {
        await Cart.deleteOne({ id: args.list[i] });
      }
      return {
        data: {
          isSuccess: true,
        },
      };
    },
  },
};

module.exports = resolvers;

const mongoose = require("mongoose");
const connect = async () => {
  mongoose
    .connect(
      `mongodb+srv://n18dcat069-shopee:n18dcat069-shopee@cluster0.rpxyi.mongodb.net/shopee`
      //   `mongodb+srv://<user>:<password>@cluster0.rpxyi.mongodb.net/<Tên database>`
      // `mongodb://localhost:27017/shopee`
    )
    .then(() => {
      console.log("Ket noi database thanh cong");
    })
    .catch((error) => {
      console.log("Ket noi database that bai " + error);
    });
};

module.exports = { connect };

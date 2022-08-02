const express = require("express"); // import thư viện express đã cài ở trên
const app = express(); // app ở đây đại diện cho cái dự án nodejs mà mình sẽ làm việc xuyên suốt
const port = 3000; // muốn run app ở port 3000

const database = require("./config/database");
database.connect();

const BodyParser = require("body-parser");
app.use(BodyParser.json());
app.use(BodyParser.urlencoded({ extended: true }));

const typeDefs = require("./schema/schema");
const resolvers = require("./resolver/resolver");
const { ApolloServer } = require("apollo-server-express");

async function startApolloServer(typeDefs, resolvers) {
  const server = new ApolloServer({ typeDefs, resolvers });
  await server.start();
  const app = express();

  server.applyMiddleware({
    app,
    path: "/",
  });
  const PORT = process.env.PORT || 7003;
  await new Promise((resolve) => app.listen({ port: PORT }, resolve));
  console.log(
    `🚀 Cart service ready at http://localhost:${PORT}${server.graphqlPath}`
  );
}

startApolloServer(typeDefs, resolvers);

// const PORT = process.env.PORT || 3000;
// app.listen(PORT, () => {
//   // Cho app lắng nghe địa chỉ localhost (127.0.0.1) trên port 3000
//   console.log(`Example app listening on port ${PORT}`);
// });

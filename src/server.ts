// import "module-alias/register";
import express from "express";
import connect from "./Utils/connect";
import router from "./router";
var cors = require("cors");

const port: number = 3000;

const app = express();
app.use(cors());

app.use(express.json());

// app.use(express.json());

app.listen(port, async () => {
  console.info(`App is listening on http://localhost:${port}`);

  await connect();
  // await connectRedis();
  app.use(router);
  //   swaggerDocs(app, port);
  //   app.use("/", routes);
});

// declarations
const PORT = 3000;
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();

//middleware setup
app.use(bodyParser.json());
app.use(cors());

//routes import
const productRouter = require("./routes/productRoutes.js");

//routes
app.use("/api/product", productRouter);

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

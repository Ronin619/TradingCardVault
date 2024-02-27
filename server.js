require("dotenv").config({ path: "./.env.local" });
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const port = process.env.PORT || 8080;
const mongoURL = process.env.DATABASE_URL;
const cardRoutes = require("./backend/src/routes/cardRoutes");
const userRoutes = require("./backend/src/routes/userRoutes");

//middleware
app.use(cors());
app.use(express.json());

app.use("/findAllCards", cardRoutes);
app.use("/createCard", cardRoutes);
app.use("/deleteCard", cardRoutes);
app.use("/editCard", cardRoutes);
app.use("/signUp", userRoutes);
app.use("/login", userRoutes);

mongoose
  .connect(mongoURL)
  .then(() => {
    app.listen(port, () => {
      console.log(`Server is running on port: ${port}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });

module.exports = app;

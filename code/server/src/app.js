require("dotenv").config();
const express = require("express");
const indexRouter = require("./routes/indexRouter");
const serverConfig = require("./config/serverConfig");

const PORT = process.env.PORT || 3001;

const app = express();

serverConfig(app);

app.use("/api", indexRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

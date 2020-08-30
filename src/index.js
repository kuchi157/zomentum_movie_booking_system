const express = require("express");
require("./db/database");

const app = express();
app.use(express.json());
const port = process.env.PORT || 8000;

//listening the application
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

const app = require("./app");
const mongoose = require("mongoose");

require("dotenv").config();

const DB_URL = process.env.DB_URL;
const PORT = process.env.PORT || 3000;
const DB_NAME = process.env.DB_NAME || "db-contacts";

const verifyFolders = require("./utils/folder");

const connection = mongoose.connect(DB_URL, {
  dbName: DB_NAME,
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

connection
  .then(() => {
    app.listen(PORT, function () {
      verifyFolders();
      console.log(
        "Database connection successful. Server running. Use our API on port: 3000"
      );
    });
  })
  .catch((err) => {
    console.log(`Server not running. Error message: ${err.message}`);
    process.exit(1);
  });

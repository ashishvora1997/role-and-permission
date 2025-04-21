require('dotenv').config();
const express = require("express");
const errorHandler = require('./middleware/errorHandler.js');
// require("./config/dbConnection.js");
const { connectDb  } = require("./models");


connectDb();

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());
app.use("/api/task", require("./routes/task.routes.js"))
app.use("/api/users", require("./routes/user.routes.js"));
app.use("/api/roles", require("./routes/role.routes.js"))

// Middleware to handle errors
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});


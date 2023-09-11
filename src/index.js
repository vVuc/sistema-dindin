const express = require("express");
const userRoute = require("./routes/user");
const transactionRoute = require("./routes/transaction");
const loginRoute = require("./routes/login");
const categoriesRoute = require("./routes/categories");
const app = express();
const port = 3000;

app.use(express.json());
app.use("/login", loginRoute);
app.use("/usuario", userRoute);
app.use("/categoria", categoriesRoute);
app.use("/transacao", transactionRoute);

app.listen(port);

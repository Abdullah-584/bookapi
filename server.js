const express = require("express");

const app = express();

app.use(express.json());

app.use("/books", require("./routes/bookRoutes"));

app.listen(5000, () => {
    console.log("Server running on port 5000");
});
app.use("/auth", require("./routes/authRoutes"));

app.use("/books", require("./routes/bookRoutes"));
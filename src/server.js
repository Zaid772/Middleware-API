require("dotenv").config();
const express = require("express");
const app = express();

const userRouter = require("./routes/routes");
const User = require("./models/users");

const port = process.env.PORT || 5001;

app.use(express.json());
app.use(userRouter);


function syncTables() {
    User.sync();
    // creates the user table if it does not already exist otherwise it does nothing
};

app.get("/health", (req, res) => {
    res.status(200).json({ message: "This API is alive and healthy" })
});

app.listen(port, () => {
    console.log(`Server is listenting on port ${port}`);
    syncTables();
});
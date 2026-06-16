const express = require("express");
const mongoose = require("mongoose");
const session = require("express-session");
require("dotenv").config();

const app = express();

mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log("MongoDB conectado"))
    .catch(err => console.log(err));

app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: true }));

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
}));

const authRoutes = require("./routes/authRoutes");
const plantRoutes = require("./routes/plantRoutes");

app.use(authRoutes);
app.use(plantRoutes);
app.use(express.static("public"));

app.listen(3000, () => {
    console.log("Servidor rodando");
});
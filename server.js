require("dotenv").config();

const express = require("express");
const path = require("path");

const connectDB = require("./config/db");

const searchRoutes = require("./routes/searchRoutes");
const resourceRoutes = require("./routes/resourceRoutes");

const app = express();

connectDB();

app.use(express.json());

app.use(express.static(path.join(__dirname, "public")));

app.use("/api/search", searchRoutes);
app.use("/api/resources", resourceRoutes);

app.get("/", (req, res) => {
    res.sendFile(
        path.join(__dirname, "public", "index.html")
    );
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
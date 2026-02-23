const express = require('express');

const { connectMongoDb } = require("./connection.js")

const { logReqRes } = require("./middlewares/index.js")

const { connect } = require('http2');

const userRoutes = require("./routes/user.js");

const app = express();
const port = 8080;

// MongoDB connection to project-02
connectMongoDb('mongodb://127.0.0.1:27017/project-02');

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(logReqRes("log.txt")) 

app.use("/user", useRouter);

// Start server
app.listen(port, () => {
  console.log(`🚀 Server running on http://localhost:${port}`);
});

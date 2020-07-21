const authRouter = require("./auth/auth-router");
const jokesRouter = require("./jokes/jokes-router");
const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const server = express();
const port = process.env.PORT || 3300;

server.use(helmet());
server.use(cors());
server.use(express.json());
server.use(cookieParser());
server.use("/api/auth", authRouter);
server.use("/api/jokes", jokesRouter);
server.use((err, req, res, next) => {
    console.log(err);

    res.status(500).json({
        message: "Something went wrong"
    });
});

if (!module.parent) {
    server.listen(port, () => {
        console.log(`\n=== Server listening on port ${port} ===\n`);
    });
}

module.exports = server;

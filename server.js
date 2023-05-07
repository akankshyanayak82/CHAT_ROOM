const path = require("path");
const http = require("http");
const express = require("express");
const socketIO = require("socket.io");

const port = process.env.PORT || 3000;

const app = express();

const server = http.createServer(app);
const io = socketIO(server);

app.use(express.static(path.join(__dirname, "public")));

io.on("connection", (socket) => {
    var userName = "";
    socket.on("join", (username) => {
        userName = username;
        io.emit("updateMesssagesConnect", userName);
    });
    socket.on("sentMessage", (input) => {
        io.emit("message", input);
    });

    socket.on("disconnect", () => {
        io.emit("updateMesssagesDisconnect", userName);
    });
});

server.listen(port, () => {
    console.log(`Server is listening at Port ${port}`);
});
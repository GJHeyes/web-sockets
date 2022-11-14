const express = require("express"),
  http = require("http"),
  { Server } = require("socket.io"),
  path = require("path"),
  app = express(),
  server = http.createServer(app),
  io = new Server(server),
  html = path.join(__dirname, "..", "public");

app.use("/", express.static(html));

io.on("connection", (socket) => {
  socket.on("chat message", (msg) => {
    io.emit("chat message", msg);
  });
});

server.listen(5001);

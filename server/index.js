const express = require("express");
const http = require("http");
const cors = require("cors");
const app = express();
const socketIO = require("socket.io");
const server = http.createServer(app);

// middlewares
app.use(cors());

// should pass express server
const io = new socketIO.Server(server, {
  cors: {
    origin: "http://localhost:3000", //tell cors it can connet with react
    methods: ["GET", "POST"], //can requests get and post
  },
});

io.on("connection", (socket) => {
  //socket is listening to connection event
  console.log(socket.id);
  socket.on("disconnect", () => {
    //listen to the disconnect
    console.log("User Disconnected ", socket.id);
  });
});

const PORT = 5000;
server.listen(PORT, () => {
  console.log(`Server is listening to the ${PORT}...`);
});

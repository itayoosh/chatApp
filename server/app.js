const express = require("express");
const cors = require("cors");
const http = require("http");
const path = require("path");
const { routsInit } = require("./routs/configRoutes");
const cookieParser = require('cookie-parser');
const { Server } = require('socket.io');
require("./mongoDB/mongoConnect");

const app = express();

app.use(express.json());
app.use(cookieParser());

app.use(express.static(path.join(__dirname, "public")));

app.use(cors({
  origin: true,
  credentials: true
}));

routsInit(app);

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "PUT"],
    credentials: true
  }
});

io.on('connection', (socket) => {
  
  socket.on('sendMessage', () => {
    io.emit('newMessage');
  });

  socket.on('disconnect', () => {
  });
});
require('dotenv').config();
const port = process.env.PORT || 3003;
server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
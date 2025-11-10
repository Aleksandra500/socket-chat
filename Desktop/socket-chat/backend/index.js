require('dotenv').config();
const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const db = require('./db');
const chatSocket = require('./socket/chat')
const cors = require('cors');

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"]
  }})
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}));

chatSocket(io)
 
const PORT = process.env.PORT || 3000;
server.listen(PORT, () =>
	console.log(`Server je pokrenut na ${PORT} `)
);

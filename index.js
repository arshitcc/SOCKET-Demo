import express from "express";
import { createServer } from "http";
import dotenv from "dotenv";
import { Server } from "socket.io";

dotenv.config({
  path: "./.env",
});

const app = express();
const port = process.env.PORT || 6969;
const server = createServer(app);
const io = new Server(server);

app.use(express.static("public"));

app.route("/").get((req, res) => {
  res.send(__dirname + "/public/index.html");
});

io.on("connection", (socket) => {
    console.log("Connection established");
    socket.on("chat", (msg) => {
      socket.broadcast.emit('chat', msg);
    });
})


server.listen(port, () => {
  console.log(`Server is listening at http://localhost:${port}`);
});

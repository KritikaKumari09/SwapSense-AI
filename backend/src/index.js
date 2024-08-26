import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import { upload } from "./middlewares/multer.middleware.js";

import { Server } from "socket.io";
import {createServer} from 'http'
import ApiResponse from './utils/apiResonse.js'
import fs from 'fs'

dotenv.config({
  path: "./src/.env",
});
let response = null
const app = express();
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: '*', // Adjust this as needed for security
    methods: ['GET', 'POST']
  }
});

app.use(
  cors({
    origin: "*",
  })
);

app.get("/", (req, res) => {
  return res.json({ name: "Hrishabh Patel", msg: "Hello World!:😊" });
});

/* to handle the post request from the client-side */
app.post('/video',upload.single('video'),(req,res)=>{
  console.log('Request Recieved from frontend')
  const file = req.file;
  if(!file)return res.json(new ApiResponse('Please provide a video',{data: null}, false))
    io.emit('process_video',file.filename)

  setTimeout(()=>{
    // fs.unlinkSync(`./public/temp/${file.filename}`)
    return res.json(new ApiResponse('Sucess',{response},true))
  },30000)
})

io.on('connection',(socket)=>{

  /* Event listener to listen on data emmited from py */
  socket.on('data',(data)=>{
    response = data
  })
})

const PORT = process.env.PORT || 3000;
server.listen(PORT, async() => {
  
  console.log(`Server listening on port ${PORT}`);
});

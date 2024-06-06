const express = require('express');
const dotenv = require('dotenv');
const router = require('./routes/web');
const cors = require('cors');
const connection = require('./config/config');
const app = express();
dotenv.config()

connection()

process.on('uncaughtException',(err)=>{
    console.error(err.name,':',err.message);
    process.exit(0)
})
app.use(cors());
app.use(express.json())
app.use('/api',router)
 const server = app.listen(5000,()=>{
    console.log('app is running on the port 5000')
})

process.on('unhandledRejection',(err)=>{
    console.log(err.name,':',err.message)
    console.log('server is shutting down');
    server.close()
    process.exit(0)
})

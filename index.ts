import mongoose, { ConnectOptions } from 'mongoose'
import { runServer } from "./src/api/server"
import { MONGODB_CONFIG } from './config'
require('dotenv').config()


function init() {
    mongoose.connect(`${process.env.MONGO_URI}`, 
    MONGODB_CONFIG as ConnectOptions)
    .then(() => {
        console.log("MongoDB Conected!!!")
    })
    .then(() => {
        runServer()
    })
    .catch((e) => {
        console.log(e)
    })
}

init()
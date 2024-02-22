import {Request, Response} from 'express-serve-static-core'
import express from 'express'
import usersRoute from './routes/usersRoute'
import moviesRoute from './routes/moviesRoute'
import Mongoose from 'mongoose'
const port:number = 3000
const app = express()
require('dotenv').config()

app.use(express.json());
app.use(express.urlencoded({
    extended : false
}))

Mongoose.connect(process.env.MONGO_URI as string)

const db = Mongoose.connection;
//Bind connection to error event (to get notification of connection errors)
db.on("error", console.error.bind(console, "MongoDB connection error:"));



app.get('/', (req : Request, res : Response) => {
    res.send('Welcome to our first API using node')
})


app.use('/api', usersRoute, moviesRoute)

app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})
import {Request, Response} from 'express-serve-static-core'
import express from 'express'
import usersRoute from './routes/usersRoute'
import moviesRoute from './routes/moviesRoute'
import Mongoose from 'mongoose'
import path from 'node:path'
const port:number = 3000
const app = express()
require('dotenv').config()

app.use(express.json());
app.use(express.urlencoded({
    extended : false
}))

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))

Mongoose.connect(process.env.MONGO_URI as string)

const db = Mongoose.connection;
//Bind connection to error event (to get notification of connection errors)
db.on("error", console.error.bind(console, "MongoDB connection error:"));



app.get('/', (req : Request, res : Response) => {
    res.render('home')
})

app.get('/login', (req : Request, res : Response) => {
    res.render('login')
})

app.get('/register', (req : Request, res : Response) => {
    res.render('register')
})


app.use('/api', usersRoute, moviesRoute)

app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})
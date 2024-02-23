import {Request, Response} from 'express-serve-static-core'
import express from 'express'
import usersRoute from './route/usersRoute'
import path from 'node:path'
import authRouter from './route/authRoute'
import axios from 'axios'
const port:number = 3000
const app = express()

app.use(express.json());
app.use(express.urlencoded({
    extended : false
}))

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))


// Mongoose.connect(process.env.MONGO_URI as string)

// const db = Mongoose.connection;
// //Bind connection to error event (to get notification of connection errors)
// db.on("error", console.error.bind(console, "MongoDB connection error:"));



app.get('/', (req : Request, res : Response) => {
    res.render('home')
})

app.get('/login', (req : Request, res : Response) => {
    res.render('login')
})

app.get('/register', (req : Request, res : Response) => {
    res.render('register')
})

app.post('/login', (req : Request, res : Response) => 
    axios.post('http://localhost:3002/login', req.body)
    .then(userData => {
        return res.json(userData)
    })
    .catch(err => console.error(err))
)


app.post('/register', (req : Request, res : Response) => {
    axios.post('http://authentication-service:3002', req.body)
    .then(userData => {
        return res.json(userData)
    })
})



app.use('/api', usersRoute, authRouter)

app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})
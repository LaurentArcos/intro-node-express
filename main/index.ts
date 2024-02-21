import {Request, Response} from 'express-serve-static-core'
import express from 'express'

const port:number = 3000
const app = express()


const users = [
    {
        name : 'John',
        lastName : 'Doe',
        age : 32
    },
    {
        name : 'Jane',
        lastName : 'Doe',
        age : 34
    }
]


app.get('/', (req : Request, res : Response) => {
    res.send('Welcome to our first API using node')
})

app.get('/users', (req : Request, res : Response) => {
    res.json(users)
})

app.get('/api/:name', (req : Request, res : Response ) => {
    console.log(req.params)
})


app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})
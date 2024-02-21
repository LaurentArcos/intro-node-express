import {Request, Response} from 'express-serve-static-core'
import express from 'express'
const usersRoute = express.Router()



usersRoute.get('/users', (req : Request, res : Response) => {
    res.send('Users route')
})

usersRoute.get('/users/:name/:id', (req : Request, res : Response) => {
    console.log(req.params)
    res.send(`Welcome ${req.params.name}`)
})



export default usersRoute


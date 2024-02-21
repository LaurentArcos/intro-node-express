import {Request, Response} from 'express-serve-static-core'
import express from 'express'
const usersRoute = express.Router()



usersRoute.get('/users', (req : Request, res : Response) => {
    res.send('Users route')
})



export default usersRoute


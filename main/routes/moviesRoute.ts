import {Request, Response} from 'express-serve-static-core'
import express from 'express'
const moviesRoute = express.Router()


const movies = [
    {
        id : 1,
        name : 'Poor things',
        genre : 'Sci-fi'
    },
    {
        id : 2,
        name : 'Mais qui a tué pamela rose',
        genre : 'Thriller'
    },
    {
        id : 3,
        name : 'Gladiator',
        genre : 'Historic'
    }
]


moviesRoute.get('/movies', (req : Request, res : Response) => {
    res.json()
})
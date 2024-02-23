import {Request, Response} from 'express-serve-static-core'
import express from 'express'
const moviesRoute = express.Router()


const movies = [
    {
        id : 1,
        name : 'The Lord Of The Rings',
        genre : 'Fantasy'
    },
    {
        id : 2,
        name : 'Zodiac',
        genre : 'Thriller'
    },
    {
        id : 3,
        name : 'Kingdom Of Heaven',
        genre : 'Historic'
    }
]


moviesRoute.get('/movies', (req : Request, res : Response) => {
  res.json(movies)
})


moviesRoute.get('/movies/:id', (req : Request, res : Response) => {
  let movieId = parseInt(req.params.id)
  // connection.query(`SELECT * FROM movies where id = ? `, movieId)
  let movie = movies.find(movie => movie.id === movieId)
  res.json(movie)
})


moviesRoute.post('/movies', (req : Request, res : Response) => {
  // connection.query(`INSERT INTO movies VALUES(?,?)`, req.body.name, req.body.genre)
  let movieId = movies.length + 1
  let movie = {
      id : movieId,
      name : req.body.name,
      genre : req.body.genre,
  }
  movies.push(movie)
  res.json(movies)
})


moviesRoute.put('/movies/:id', (req : Request, res : Response) => {
  let movieId = parseInt(req.params.id)
  let movie = movies.find(movie => movie.id === movieId)
  movie!.name = req.body.name
  res.json(movie)
})

moviesRoute.delete('/movies/:id', (req : Request, res : Response ) => {
  const movieId = parseInt(req.params.id)
  const movie = movies.find(movie => movie.id === movieId)
  const index = movies.indexOf(movie!)
  movies.splice(index, 1)
  res.send('Movie deleted')
})


export default moviesRoute
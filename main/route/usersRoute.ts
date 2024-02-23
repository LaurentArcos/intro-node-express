import {Request, Response} from 'express-serve-static-core'
import express from 'express'
import User from '../model/User'
const usersRoute = express.Router()
import verify from '../middleware/verify'



usersRoute.get('/users', verify ,  async  (req : Request, res : Response) => {
    try{
        // On vient recuperer le model user et on applique la methode .find() qui va nous permettre de recuperer les documents dans la collection User
        const users = await User.find()
        // on remplace notre res.json(users) par res.render car l'on veut render une page ejs en lui passant nos users
        // dans notre fichier ejs on sera en mesure de recuperer ces users et les manipuler
        res.render('users', {users})
    }
    catch(err){
        console.error(err)
    }

})


usersRoute.get('/users/:id', (req : Request, res : Response) => {
    // On vient recuperer le document grace a son id en utilisant la methode findOne et en lui passant req.params.id qui est le parametre dans notre URL (:id)
    User.findOne({_id : req.params.id})
    .then(user => res.json(user))
    .catch(err => console.error(err))
})



usersRoute.post('/users', (req : Request, res : Response) => {
    // On utilise la methode create afin d'ajouter un utilisateur, en passe comme parametre req.body qui est le corp de notre requete 
    User.create(req.body)
    .then(newUser => res.json(newUser))
    .catch(err => console.error(err))
})

usersRoute.put('/users/:id', async (req : Request, res : Response) => {
    // On veut update un utilisateur, on va d'abord recuperer un utilisateur par son id avec la methode findOne et ensuite utiliser updateOne afin de le modifier
    try{
        const findUser:any = await User.findOne({_id : req.params.id})
        const updateUser = await findUser.updateOne({$set : req.body})
        res.json(updateUser)
    }
    catch(err){
        console.error(err)
    }

})


usersRoute.delete('/users/:id', async (req: Request, res : Response) => {
    // On vient delete un utilisateur par son id, on recupere l'id dans notre param d'url encore une fois req.params.id
    try{
        const deleteUser = await User.deleteOne({_id : req.params.id})
        res.json('User has been deleted')
    }
    catch(err){
        console.error(err)
    }
})



export default usersRoute
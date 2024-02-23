import {Response, Request} from 'express-serve-static-core'
import User from '../model/User'
import express from 'express'
import bcrypt from 'bcryptjs'
import jsonwebtoken from 'jsonwebtoken'
const authRouter = express.Router()

const jwt_key:string = process.env.JWT_SECRET || 'MA-CLE-TR0P-F0RTE'


authRouter.post('/register', async (req : Request, res : Response) => {
    // On vient deconstruire le req.body, on y recupere le champ username et password
    const {email, username, password} = req.body
    // emailVerification va nous permettre de chercher en base de donnee si un utilisateur utilise deja cet email
    const emailVerification = await User.findOne({email : email})
    if(emailVerification) return res.status(400).send('Email is already taken')

    // j'utilise la fonction genSalt de bcrypt qui me permet de generer un salt, un salt est une serie de charactere qui me permet d'ajouter de la 
    // complexite et de la securite a notre password et de se protegrer des attaques rainbow tables
    // la fonction hash, nous permet de hasher notre password
    const passwordSalt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, passwordSalt)

    // creation du user en fonction du req.body et du password hashe precedemment
    const user = new User({
        email : email,
        username : username,
        password : hashedPassword
    })

    // on sauvegarde le user en BDD
    user.save()
    .then(user => res.render('login'))
    .catch(err => console.log(err))
})


authRouter.post('/login', async (req : Request, res : Response) => {
        const {email, password} = req.body
        const user = await User.findOne({email : email}) 
        if(!user) return res.status(400).send('Email ou Password incorrect')

        // On vient comparer le password de notre user que l'on a recupere grace a son email dans l'instruction precedente avec le password de req.body
        const validPass = await bcrypt.compare(password, user.password)
        if(!validPass) return res.status(400).send('Email ou Password incorrect') 

        // On genere un token JWT en lui passant le payload ainsi que le secret
        const token = jsonwebtoken.sign({id : user._id, username : user.username}, jwt_key)
        res.header('auth-token', token)
        res.json(token)
})



export default authRouter
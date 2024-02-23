import {Request, Response, NextFunction} from 'express-serve-static-core'
import jwt from 'jsonwebtoken'


const jwt_key:string = process.env.JWT_SECRET || 'MA-CLE-TR0P-F0RTE'


const verify = (req : Request, res : Response, next : NextFunction) => {
    const token = req.header('auth-token')
    if(!token) return res.status(400).send('Access denied')
    try{
        const verified = jwt.verify(token, jwt_key)
        console.log(verified)
        next()
    }
    catch(err){
        console.log(err)
    }
}


export default verify
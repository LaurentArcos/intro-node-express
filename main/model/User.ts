import mongoose from 'mongoose'


const mongoUrl:string = process.env.MONGO_URL || "mongodb://mongodb:27017/demo";
mongoose.connect(mongoUrl);

const userSchema = new mongoose.Schema({
    email : { 
        type : String,
        required : true,
        unique : true
    },
    username : {
        type : String,
        required : true,
    },
    password : {
        type : String,
        required : true,
        minLength : 6
    }
})


const User = mongoose.model('User', userSchema)

export default User
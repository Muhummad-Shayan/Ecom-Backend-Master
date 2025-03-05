import bcrypt from 'bcrypt'
import User from '../models/userSchema.js'


const signUpUser = async (data) =>{
    try {
        const {name,email,password} = data
        
        const hashPassword = await bcrypt.hash(password , 10)
        
        
        const newUser = new User({
                    name:name,
                    email : email,
                    password : hashPassword,
                    contact: "",
                    address:""
        
        })
                
        await newUser.save()
        
                
        newUser.password = undefined
        
        return newUser

    } catch (error) {
        throw new Error(`Error during register user ${error.message}`);
        
    }
}




export {signUpUser}
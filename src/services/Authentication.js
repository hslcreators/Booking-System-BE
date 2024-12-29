require('dotenv').config()
import AuthRepo from "../repositories/AuthRepo";
import jwt from "jsonwebtoken"
import bcrypt from 'bcrypt'
class AuthenticationService extends AuthRepo {
    // service layer
    generateToken(user) {
        return jwt.sign(
            { id: user.id, email: user.email },
            process.env.SECRET_KEY,
            { expiresIn: '1h' }
        );
    }

    async userSignup(userData){
       try {
        
        const { firstName, lastName, password, email, phoneNumber} = userData

        // check the database if the user already exist 
        const userExist = await this.findUserByEmail(email) // implement the findUserByEmail logic in the parent Class
        if(userExist) {} // throw error
        
        // else hash the password and save the new user to the database 
        const hashedPassword = bcrypt.hash(password, 12);
        const saveUser = await this.registerUser(userData) // implement the registerUser logic in the parent class
        // return the new user object to the controller.

        return saveUser;

       } catch (error) {
        throw error
       }
        
    }
    
}

export default AuthenticationService
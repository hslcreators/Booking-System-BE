import dotenv from 'dotenv';
import AuthRepo from "../repositories/AuthRepo.js";
import jwt from "jsonwebtoken"
import bcrypt from 'bcrypt'
class AuthenticationService extends AuthRepo {
    // service layer
    async registerUser(data){
        const user = await this.createUser(data);
        if(!user || user.err){
            //fix error handling
            throw new Error('Error Creating Users')
        }
        return true //shoud redirect to login after creating
    }

    async loginUser(email, password){
        const user = await this.findUserByEmail(email);
        if (!user || !this.IsPassword(password, user.password)){
            throw new Error("Invalid Credentials")
        }
        return this.generateToken(user)
    }

    IsPassword(inputPassword, userPassword){
        bcrypt.compare(inputPassword, userPassword, function(err, result) {
            if (err || result == false) return false; //error handle later
            if (result == true) return true;
        });
    }

    generateToken(user) {
        return jwt.sign(
            { id: user.id, email: user.email, role: user.role },
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
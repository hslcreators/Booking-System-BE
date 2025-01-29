import dotenv from 'dotenv';
import AuthRepo from "../repositories/AuthRepo.js";
import jwt from "jsonwebtoken"
import bcrypt from 'bcrypt'
class AuthenticationService extends AuthRepo {
    // service layer
    async registerUser(data){
        try {
            const user = await this.createUser(data);
            if(!user) throw new Error('Error Creating Users')
            return {success: true, msg: "User Created Succesfully"}
        } catch (error) {
            console.error("Error creating user:", error.message);
            throw new Error(error.message || "Error creating user");
        }
    }

    async loginUser(email, password){
        try {
            const user = await this.findUserByEmail(email);
            if (!user || !this.IsPassword(password, user.password)){
                throw new Error("Invalid Credentials")
            }
            return this.generateToken(user)   
        } catch (error) {
            console.error("Error creating user:", error.message);
            throw new Error(error.message || "Error creating user");
        }
    }

    IsPassword(inputPassword, userPassword){
        bcrypt.compare(inputPassword, userPassword, function(err, result) {
            if (err || result == false) return false; //error handle later
            if (result == true) return true;
        });
    }

    isValidEmail(email) {
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return emailRegex.test(email);
    }

    generateToken(user) {
        return jwt.sign(
            { id: user.id, email: user.email, role: user.role },
            process.env.SECRET_KEY,
            { expiresIn: '1h' }
        );
    }
    
}

export default AuthenticationService
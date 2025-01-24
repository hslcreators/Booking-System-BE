import { User } from "../models/user.js"
import bcrypt from "bcrypt"
class AuthRepo {
    // database activities
    async createUser(data){
        // create user in db
        let password;
        let saltRounds = 10
        bcrypt.hash(data.password, saltRounds, function(err, hash) { // hash password
            if(err) throw new Error("Error Hashing Password") 
            password = hash
        });
        const user = new User({
            firstName: data.firstName,
            lastName: data.lastName,
            email: data.email,
            password: password,
            phoneNumber: data.phoneNumber
        });
        user.save()
        return user
    }

    async findUserByEmail(email){
        // find user by email
        let user;
        User.find({email:   email}, function(err, userList){
            if(err) throw new Error("Error Finding user")
            if(userList) user = userList[0]
        })
        return user
    }
}

export default AuthRepo
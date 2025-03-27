import { User } from "../models/user.js"
import bcrypt from "bcrypt"
class AuthRepo {
    // database activities
    async createUser(data){
        // create user in db
        try {
            let saltRounds = 10
            let hashedpassword = bcrypt.hash(data.password, saltRounds)
            const user = new User({
                firstName: data.firstName,
                lastName: data.lastName,
                email: data.email,
                password: hashedpassword,
                phoneNumber: data.phoneNumber
            });
            await user.save()
            return user            
        } catch (error) {
            console.error("Error creating user:", error.message);
            throw new Error(error.message || "Error creating user");
        }
    }

    async findUserByEmail(email){
        // find user by email
        try {
              const user = await User.findOne({ email });
              if (!user) throw new Error("User not found")
              return user;
        } catch (error) {
            console.error("Error finding user:", error.message);
            throw new Error(error.message || "Error finding user");
        }
    }
}

export default AuthRepo
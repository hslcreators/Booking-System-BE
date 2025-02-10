import { User } from "../models/user.js"

class UserRepo {
    async getUserById(id){
        try {
            const user = User.findById(id)
            if (user) return user
            throw new Error("User Not Found")
        } catch (error) {
            throw new Error(`Error Fetching User: ${error.message}`);
        }
    }
}

export default UserRepo
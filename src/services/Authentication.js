import AuthRepo from "../repositories/AuthRepo";
import jwt from "jsonwebtoken"

class AuthenticationService extends AuthRepo {
    // service layer
    generateToken(user) {
        return jwt.sign(
            { id: user.id, email: user.email },
            process.env.SECRET_KEY,
            { expiresIn: '1h' }
        );
    }
    
}

export default AuthenticationService
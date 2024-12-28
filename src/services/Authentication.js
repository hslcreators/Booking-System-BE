import AuthRepo from "../repositories/AuthRepo";


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
import AuthenticationService from "../services/Authentication.js"

const authService = new AuthenticationService();

export const registerController = async (req, res) => {
    try {
        let { firstName, lastName, email, password, phoneNumber } = req.body
        // add error handling for the inputs(Email verification)
        let userData = { firstName, lastName, email, password, phoneNumber}
        let Isregistered = await authService.createUser(userData)
        if(Isregistered) {
            res.status(200)
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

export const loginController = async (req, res) => {
    try {
        let { email, password } = req.body
        let token = authService.loginUser(email, password)
        res.status(200).json({accessToken: token})
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

//Error handling needs update
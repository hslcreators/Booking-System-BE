import AuthenticationService from "../services/Authentication.js"

const authService = new AuthenticationService();

export const registerController = async (req, res) => {
    try {
        let { firstName, lastName, email, password, phoneNumber } = req.body
        if(!authService.isValidEmail(email)){
            res.status(400).json({message: "Invlaid Email"})
            throw new Error("Invalid Email");
        }
        let userData = { firstName, lastName, email, password, phoneNumber}
        let Isregistered = await authService.registerUser(userData)
        if(Isregistered.success) {
            res.status(200)
        }
    } catch (error) {
        console.error("Error Creating User:", error.message);
        res.status(400).json({ message: error.message });
    }
}

export const loginController = async (req, res) => {
    try {
        let { email, password } = req.body
        if(!authService.isValidEmail(email)) res.status(400).json({message: "Invlaid Email"})
        let token = authService.loginUser(email, password)
        if(!token) throw new Error("Error Loggiing User In")
        res.status(200).json({accessToken: token})
    } catch (error) {
        console.error("Error Logging User In:", error.message);
        res.status(400).json({ message: error.message });
    }
}

//Error handling needs update
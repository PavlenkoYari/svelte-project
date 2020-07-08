import crypto from 'crypto';
import User from '../../models/user'

function generateHash (password) {
    // TODO: add some salt, change hash function?
    const hash = crypto.createHash('sha256');
    hash.update(password);
    return hash.digest('hex');
}

async function tryLogin (email, password) {
    const user = await User.findOne({email: email});
    if(!user){
        return {
            success: false,
            message: "User with that name does not exist"
        }
    }

    const hashPassword = generateHash(password);
    const passwordCorrect = user.password === hashPassword;
    const message = passwordCorrect ? '' : 'Password is incorrect';

    if(passwordCorrect){
        return {
            success: true,
            errorObj: {
                loginError: "",
                passwordError: ""
            },
            user: {
                user_id: user._id,
                email: user.email,
                admin: user.admin
            },
            lang: user.lang
        }
    }
    else
    {
        return {
            success: false,
            errorObj: {
                loginError: "",
                passwordError: "Password is incorrect"
            }
        }
    }
}

export async function post(req, res) {
    const EMAIL = req.body.email.trim();
    const PASSWORD = req.body.password.trim();

    if(!EMAIL.length || !PASSWORD.length){
        res.end(JSON.stringify({
            success: false,
            errorObj: {
                loginError: !EMAIL.length ? "Email cannot be blank." : "",
                passwordError: !PASSWORD.length ? "Password cannot be blank." : ""
            },
        }));
    }
    else
    {
        const result = await tryLogin(EMAIL, PASSWORD);
        
        if (result.success) {
            req.session.user = result.user;
            req.session.lang = result.lang;
        }
        res.end(JSON.stringify(result));
    }

}

import { validRegisterForm } from "../../helper/validation"
import crypto from "crypto";
import { sendEmail } from "../../helper/sendEmail"
import path from "path";

import User from '../../models/user'


function generateHash (password) {
    // TODO: add some salt, change hash function?
    const hash = crypto.createHash('sha256');
    hash.update(password);
    return hash.digest('hex');
}

function setPassword (){
    let charSet = 'ABCDEFGHIJKabcdefghijk1234567890lmnopqrstuvwxyzLMNOPQRSTUVWXYZ';
    var randomString = '';
    for (var i = 0; i < 12; i++) {
        var randomPoz = Math.floor(Math.random() * charSet.length);
        randomString += charSet.substring(randomPoz,randomPoz+1);
    }
    return randomString;
}

async function registerUser (email) {
    let user = await User.findOne({email})
    if(user){
        return {
            success: false,
            message: 'Email already in use',
        }
    }
    return {
        success: true,
        message: '',
        user: {
            email: email
            // avatar
        }
    }
}




export async function post(req, res) {
    const EMAIL = req.body.email.trim();
    const errorObj = validRegisterForm(false, EMAIL);
    if(errorObj.completeValid){
        let result = await registerUser(EMAIL);
        
        if (result.success) {
            const PASSWORD = setPassword();
            const newUser = await new User({
                password: generateHash(PASSWORD),
                email: EMAIL,
                receiveEmail: req.body.receiveEmail ? req.body.receiveEmail : false,
                lang: req.session.lang,
            }).save();
            req.session.user = {admin: newUser.admin, user_id: newUser._id, ...result.user };
            result.user = {admin: newUser.admin, user_id: newUser._id, ...result.user}
            await sendEmail(path.join(process.cwd(), 'src', 'email', 'register.html'), {email: "EMAIL", password: PASSWORD}, {to: EMAIL, subject: "Register new account"})

            res.end(JSON.stringify({
                ...result,
                lang: newUser.lang
            }));
        }
        else {
            res.end(JSON.stringify({
                ...result,
            }));
        }
    }
    else
    {
        res.end(JSON.stringify({
            errorObj,
            success: false,
        }));
    }

}

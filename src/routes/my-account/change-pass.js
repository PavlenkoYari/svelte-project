import { validRegisterForm } from "../../helper/validation"
import crypto from "crypto";
import User from '../../models/user'

function generateHash (password) {
    const hash = crypto.createHash('sha256');
    hash.update(password);
    return hash.digest('hex');
}


async function checkCurrentPassword(password, userEmail) {
    const user = await User.findOne({email: userEmail})
    if(generateHash(password) != user.password){
        return {
            success: false,
            errorObj: {
                passwordError: 'Password is incorrect.',
                newPasswordError: '',
                confirmPasswordError: '',
                completeValid: true
            }
        }
    }
    return { success: true }
}

export async function post(req, res) {
    const PASSWORD = req.body.password.trim();
    const CONFIRM_PASS = req.body.confirmPassword.trim();
    const NEW_PASS = req.body.newPassword.trim();
    const errorObj = validRegisterForm(false, false, PASSWORD, CONFIRM_PASS, NEW_PASS, "New password", NEW_PASS);
    if(errorObj.completeValid){
        const response = await checkCurrentPassword(PASSWORD, req.session.user.email)
        if(response.success){
            const updatePass = await User.updateOne({_id : req.session.user.user_id}, {$set: {password : generateHash(NEW_PASS)}})
            if(updatePass.nModified){
                res.end(JSON.stringify({
                    ...response,
                }))
            }
            else if(updatePass.n){
                res.end(JSON.stringify({
                    success: false,
                    message: "You cannot use the same password."
                }))
            }
            else {
                res.end(JSON.stringify({
                    success: false,
                    message: "Something went wrong..."
                }))
            }
        }
        else {
            res.end(JSON.stringify({
                ...response,
            }))
        }
    }
    else {
        res.end(JSON.stringify({
            success: false,
            errorObj,
        }))
    }

}

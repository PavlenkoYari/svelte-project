import { sendEmail } from "../helper/sendEmail"
import path from "path";

function validContactValue(email, message, name){
    let regEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,5})+$/;
    let regName = /^[a-zA-Z0-9]+$/;

    let errorObj = {
        emailError: "",
        nameError: "",
        messageError: "",
        complete: false
    }


    //email
    if(!email.trim().length){
        errorObj.emailError = 'Email cannot be blank.';
    }
    else if(!regEmail.test(email.trim())){
        errorObj.emailError = "Email is not a valid email address."
    }


    //username
    if(!name.trim().length){
        errorObj.nameError = 'Name cannot be blank.';
    }
    else if(name.trim().length < 6 || name.trim().length > 30){
        errorObj.nameError =  "Name should contain at least 6 characters and most 30 characters."
    }
    else if(!regName.test(name.trim())){
        errorObj.nameError = "Your Name can only contain alphanumeric characters and numbers."
    }

    //message
    if(!message.trim().length){
        errorObj.messageError = 'Message cannot be blank.';
    }
    else if(message.trim().length < 6 || message.trim().length > 200){
        errorObj.messageError =  "Message should contain at least 6 characters and most 200 characters."
    }


    if(!errorObj.nameError.length && !errorObj.emailError.length && !errorObj.messageError.length){
        errorObj.complete = true;
    }


    return errorObj;
}

export async function post(req, res){
    const EMAIL = req.body.email.trim();
    const TEXT = req.body.message.trim();
    const USERNAME = req.body.name.trim();
    const validation = validContactValue(EMAIL, TEXT, USERNAME);
    if(validation.complete){
        sendEmail(path.join(process.cwd(), 'src', 'email', 'contact.html'), {email: EMAIL, username: USERNAME, text: TEXT}, {to: "frontendyp@gmail.com", subject: "User send new requests"})
        res.end(JSON.stringify({
            success: true,
            message: "Your message has been sent"
        }))
    }
    else {
        res.end(JSON.stringify({
            success: false,
            validation
        }))
    }
}

export function validRegisterForm(login = false, email = false, pass = false, repeatPass = false, equalPass = false, equalName = false, newPass = false){
    let errorObj =  {
        completeValid: false
    };



    //login
    if(login !== false){
        errorObj.loginError = '';
        let regLogin = /^[a-zA-Z0-9]+$/;
        if(!login.trim().length){
            errorObj.loginError = 'Login cannot be blank.';
        }
        else if(login.trim().length < 6 || login.trim().length > 30){
            errorObj.loginError =  "Login should contain at least 6 characters and most 30 characters."
        }
        else if(!regLogin.test(login.trim())){
            errorObj.loginError = "Your Login can only contain alphanumeric characters and numbers."
        }
    }

    //password
    if(pass !== false){
        errorObj.passwordError = '';
        if(!pass.trim().length){
            errorObj.passwordError = 'Password cannot be blank.';
        }
        else if(pass.trim().length < 6 || pass.trim().length > 200){
            errorObj.passwordError =  "Password should contain at least 6 characters and most 200 characters."
        }
    }

    //New password
    if(newPass !== false){
        errorObj.newPasswordError = '';
        if(!newPass.trim().length){
            errorObj.newPasswordError = 'New password cannot be blank.';
        }
        else if(newPass.trim().length < 6 || newPass.trim().length > 200){
            errorObj.newPasswordError =  "New password should contain at least 6 characters and most 200 characters."
        }
    }

    //confirm password
    if(repeatPass !== false){
        errorObj.confirmPasswordError = '';
        if(!repeatPass.trim().length){
            errorObj.confirmPasswordError = 'Confirm password cannot be blank.';
        }
        else if(repeatPass.trim() !== equalPass.trim()){
            errorObj.confirmPasswordError =  `Confirm password must be equal to \"${equalName}\".`
        }
    }


    //email
    if(email !== false){
        errorObj.emailError = '';
        let regEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,5})+$/;
        if(!email.trim().length){
            errorObj.emailError = 'Email cannot be blank.';
        }
        else if(!regEmail.test(email.trim())){
            errorObj.emailError = "Email is not a valid email address."
        }
    }



    //complete flag
    let keyObj = Object.keys(errorObj).slice(1, errorObj.length)
    let countValidValue = 0;
    keyObj.forEach( item => {
        if(!errorObj[item].length){
            countValidValue++
        }
    });
    if(countValidValue == keyObj.length){
        errorObj.completeValid = true
    }

    return errorObj;
}

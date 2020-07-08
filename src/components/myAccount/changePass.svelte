<script>
import FormGroup from "../FormGroup.svelte";
import { validRegisterForm } from "../../helper/validation"
import {post} from '../../helper/fetch';
export let openChangePassEvent;


let password = '';
let newPassword = '';
let confirmPassword = '';

let errorObj = {
    passwordError: '',
    newPasswordError: '',
    confirmPasswordError: '',
    completeValid: true
};


async function changePassword() {
    errorObj = validRegisterForm(false, false, password, confirmPassword, newPassword, "New password", newPassword);
    if(errorObj.completeValid){
        const response = await post('/my-account/change-pass', {
            password: password.trim(),
            newPassword: newPassword.trim(),
            confirmPassword: confirmPassword.trim(),
        })
        if(response.success){
            alert('Your password has been successfully changed.')
            openChangePassEvent()
            password = '';
            newPassword = '';
            confirmPassword = '';
        }
        else {
            if(response.message){
                alert(response.message)
            }
            else{
                errorObj = response.errorObj
            }
        }
    }
}


</script>

<FormGroup label='Enter your current password:'
inputName="Password"
type='password'
value={password}
foo={event => password = event.target.value}
requiredCheck={true}
lengthVal={[6, 200]}
placeholder="Enter your current password:"
equalName='Password'
errMsg={errorObj.passwordError}
/>

<FormGroup label='New password:'
inputName="New password"
type='password'
value={newPassword}
foo={event => newPassword = event.target.value}
requiredCheck={true}
lengthVal={[6, 200]}
placeholder="Enter new password"
errMsg={errorObj.newPasswordError}
/>

<FormGroup label='Confirm new password:'
inputName="Confirm password"
type='password'
foo={event => confirmPassword = event.target.value}
requiredCheck={true}
equalVal={newPassword}
placeholder="Confirm new password:"
equalName='New password'
value={confirmPassword}
errMsg={errorObj.confirmPasswordError}
/>

<button on:click={changePassword} class="greenBkgBtn submit-change-pass">Save changes</button>



<style>
.submit-change-pass{
  margin-top: 20px;
  width: 200px;
  padding: 10px;
}
</style>

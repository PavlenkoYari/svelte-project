<script>
    import {goto, stores} from '@sapper/app';
    import {post} from '../../helper/fetch';
    import { language } from '../../store/store'
    import { validRegisterForm } from "../../helper/validation"
    import FormGroup from '../../components/FormGroup.svelte';
    const {session} = stores();

    export let swithAuthOpt;

    let errorObj = {
    	emailError: "",
    	passwordError: "",
    	completeValid: false,
    }
    let email = '';
    let password = '';


    async function tryLogin() {
        errorObj = validRegisterForm(false, email, password);
        if(errorObj.completeValid){
            const response = await post('auth/login', {
                email: email.trim(),
                password: password.trim()
            });
            if (response.success) {
                $session.user = response.user;

                await import(`../../language/${response.lang}.js`).then(res => {
                    $session.lang = response.lang;
                    language.update(() => res.lang)
                })

                await goto('/');
            }
            else {
                if(response.errorObj){
                    errorObj = response.errorObj
                }
                else {
                    errorObj ={
                    	emailError: response.message,
                    	passwordError: "",
                        completeValid: false,
                    }
                }
            }
        }
    }
</script>


<style lang="scss">
    :global(.form-group){
      margin-bottom: 35px;
    }
    .forgot-pass{
      font-size: 12px;
      font-family: open_sansregular;
      color: #ABB3C6;
      display: block;

    }
    .greenBkgBtn{
      width: 215px;
      padding: 10px;
      display: block;
      text-align: center;
      margin-top: 60px;
      margin-bottom: 20px;
    }
    .dontHave{
      font-size: 14px;
      color: #ABB3C6;
      font-family: open_sansbold;
      .link{
        color: #6FB12F;
      }
    }
</style>

<FormGroup label='Email'
inputName="Email"
type='text'
foo={event => email = event.target.value}
placeholder="Enter your email"
requiredCheck={true}
lengthVal={[6, 30]}
regCheck={/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,7})+$/}
errMsg={errorObj.emailError}
/>
<FormGroup label='Password'
type='password'
inputName="Password"
placeholder="Enter your password"
foo={event => password = event.target.value}
requiredCheck={true}
lengthVal={[6, 200]}
errMsg={errorObj.passwordError}
styleCSS='margin-bottom: 15px'
/>
<a href="/" class="forgot-pass">Forgot password?</a>
<button class="greenBkgBtn" on:click={tryLogin}>Log In</button>
<div class="dontHave">
    Don’t have an account yet? <button on:click={swithAuthOpt} class="link pointer">Sign Up</button>
</div>

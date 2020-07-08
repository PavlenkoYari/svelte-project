<script>
    import { language } from "../../store/store";
    import {post} from "../../helper/fetch";
    import {goto, stores} from '@sapper/app';
    import { validRegisterForm } from "../../helper/validation"
    import FormGroup from '../../components/FormGroup.svelte';
    const {session} = stores();

    export let swithAuthOpt;
    let receiveEmail = false;
    let email = '';
    let errorObj = {
        emailError: '',
        completeValid: false
    };

    function selectedReceiveEmail() {
        receiveEmail = !receiveEmail;
    }

    async function tryRegister() {
        errorObj = validRegisterForm(false, email);
        if(errorObj.completeValid){
            const response = await post('auth/registration', {
                email: email.trim(),
                receiveEmail
            });
            console.log(response);
            if (response.success) {
                $session.user = response.user;

                await import(`../../language/${response.lang}.js`).then(res => {
                    $session.lang = response.lang;
                    language.update(() => res.lang)
                })

                await goto('/');
            } else {
                if(response.message){
                    errorObj = {
                        emailError: response.message,
                        completeValid: false
                    };
                }
                else {
                    errorObj = response.errorObj;
                }
            }
        }
    }

</script>

<style lang="scss">
    :global(.form-group){
      margin-bottom: 35px;
    }
    .greenBkgBtn{
      width: 215px;
      padding: 10px;
      display: block;
      text-align: center;
      margin-top: 60px;
      margin-bottom: 20px;
    }
    .check-email-push{
      align-items: center;
      flex-wrap: nowrap;
      font-size: 12px;
      color: #ABB3C6;
      &.selected{
        .square-wrapper{
          .square{
            display: block;
          }
        }
      }
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
styleCSS="margin-bottom: 20px"
/>
<button class:selected={receiveEmail} class="check-email-push df pointer" on:click={selectedReceiveEmail}>
    <div class="square-wrapper df">
        <div class="square">

        </div>
    </div>
    I want to receive email updates
</button>
<button class="greenBkgBtn" on:click={tryRegister}>Continue</button>
<div class="dontHave">
    Already have an account?  <button on:click={swithAuthOpt} class="link pointer">Log In</button>
</div>

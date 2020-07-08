<script>
import { post } from "../../helper/fetch"
import FormGroup from "../../components/FormGroup.svelte"
export let email = "";
let emailError = ""

let name = "";
let nameError = "";

let message = "";
let messageError = "";



async function sendContact() {
    const response = await post('/contact', {
        name,
        email,
        message
    })

    if(!emailError.length && !nameError.length && !messageError.length){
        if(response.success){
            alert(response.message)
            name = "";
            message = "";
        }
        else {
            nameError = response.validation.nameError
            messageError = response.validation.messageError
            emailError = response.validation.emailError
        }
    }
}
</script>

<div class="contact-us">
    <div class="title4">Get in Touch</div>
    <div class="title5">Questions, bug reports, missing, feature requests  — let's improve together!</div>
    <div class="form-contact df">
        <FormGroup label='Name'
        inputName="Name"
        type='text'
        value={name}
        foo={event => name = event.target.value}
        placeholder="Enter your name"
        requiredCheck={true}
        lengthVal={[6, 30]}
        regCheck={/^[a-zA-Z0-9]+$/}
        errMsg={nameError}
        />
        <FormGroup label='Email'
        inputName="Email"
        type='text'
        value={email}
        foo={event => email = event.target.value}
        placeholder="Enter your email"
        requiredCheck={true}
        lengthVal={[6, 30]}
        regCheck={/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,7})+$/}
        errMsg={emailError}
        />
        <FormGroup label='Message'
        inputName="Message"
        type='text'
        value={message}
        foo={event => message = event.target.value}
        placeholder="Enter your message"
        requiredCheck={true}
        input={false}
        className="form-group flex100"
        lengthVal={[6, 200]}
        errMsg={messageError}
        />
    </div>
    <button class="send-contact greenBkgBtn" on:click={sendContact}>
        Send
    </button>
</div>



<style lang="scss">
.contact-us{
  width: 60%;
  .title4{
    font-size: 24px;
    font-family: open_sansbold;
    color: #FFFFFF;
    margin-bottom: 17px;
  }
  .title5{
    ont-size: 14px;
    color: #818796;
    margin-bottom: 40px;
  }
  .form-contact{
    justify-content: space-between;
    & :global(.form-group){
        flex: 48% 0 1;
        margin-bottom: 20px;
        &.flex100{
            flex: 100% 0 1;
            & :global(textarea){
              height: 150px;
              resize: none;
              &::placeholder{
                font-family: cabinregular;
              }
            }
        }
    }
  }
  .send-contact{
    width: 190px;
    padding: 8px;
    text-align: center;
    margin-top: 40px;
  }
}

@media (max-width: 700px) {
    .contact-us{
      width: 100%;
    }
}
</style>

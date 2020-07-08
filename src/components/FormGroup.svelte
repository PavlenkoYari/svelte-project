<script>
    export let label = "";
    export let type = "";
    export let value = "";
    export let inputName = "";
    export let requiredCheck = false;
    export let lengthVal = [];
    export let equalVal = false;
    export let equalName = "";
    export let className = "form-group";
    export let regCheck = false;
    export let input = true;
    export let placeholder = "";
    export let keyUpFoo = () => {};
    export let foo = () => {};
    export let errMsg = "";
    export let styleCSS = "";
    let focusFlag = false;
    let errorMsg = '';
    $: errMsg ? errorMsg = errMsg : errorMsg = "";


    function validate(e){
        focusFlag = false;
        if(foo){
            foo(e);
        }

        if(requiredCheck){
            if(!value.trim().length){
                return errorMsg = `${inputName} cannot be blank.`;
            }
        }

        if(lengthVal.length){
            if(lengthVal.length == 2){
                if(value.trim().length < lengthVal[0] || value.trim().length > lengthVal[1]){
                    return errorMsg =  `${inputName} should contain at least ${lengthVal[0]} characters and most ${lengthVal[1]} characters.`;
                }
            }
            else {
                if(value.trim().length != lengthVal[0]){
                    return errorMsg =  `${inputName} should contain at ${lengthVal[0]} characters.`;
                }
            }
        }

        if(equalVal){
            if(equalVal.trim() !== value.trim()){
                return errorMsg =  `${inputName} must be equal to \"${equalName}\".`;
            }
        }

        if(regCheck){
            if(!regCheck.test(value.trim())){
                return errorMsg = `${inputName} is not a valid.`;
            }
        }


        errorMsg = '';
    }
</script>
<div class:has-error={!!errorMsg.length} class:-focus={focusFlag} class={className} style={styleCSS}>
    <div class="label">{label}</div>
    {#if input}
        {#if type == 'text'}
            <input type='text' bind:value on:keyup={keyUpFoo} on:blur={validate} on:focus={() => focusFlag = true} {placeholder}>
        {:else}
            <input type='password' bind:value on:keyup={keyUpFoo} on:blur={validate} on:focus={() => focusFlag = true} {placeholder}>
        {/if}
    {:else}
        <textarea bind:value on:keyup={keyUpFoo} on:blur={validate} on:focus={() => focusFlag = true} {placeholder}></textarea>
    {/if}

    <div class="error">{errorMsg}</div>
</div>



<style lang="scss">
.form-group{
  position: relative;
  &.-focus{
    input,textarea{
      background: #32343C;
      border: 1px solid #4F5462;
    }
    .label{
      color: #949DB3;
    }
  }
  &.has-error{
    .label{
      color: #953C53;
    }
    input{
      background: #2B1D20;
      border: 1px solid #953C53;
    }
    .error{
      display: block;
    }
  }
  .label{
    font-family: open_sansregular;
    font-size: 12px;
    color: #606674;
    margin-bottom: 7px;
  }
  input{
    width: 100%;
    padding: 10px 15px;
    line-height: 1;
    font-size: 14px;
    color: #ABB3C6;
    background: #27292F;
    border: 1px solid #2E3139;
    border-radius: 3px;
    &::placeholder{
      color: #818796;
    }
  }
  .error{
    font-size: 12px;
    font-family: open_sansregular;
    color: #953C53;
    margin-top: 5px;
    display: none;
  }
}
</style>

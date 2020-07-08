<script>
export let order;

let recipient;
let iban;
let bic;
let reference;


function copyEvent(target, copyBtn) {
    copyBtn.classList.add("help-open")
    target.select();
    document.execCommand('copy');
    setTimeout(() => {
        copyBtn.classList.remove("help-open")
    }, 3000)
}
</script>



<div class="title3">Payment details</div>
<div class="tabs df">
   <button class="tab pointer" id="tab2">SEPA Transfer</button>
</div>
<div class="tab-content open tab2">
   <div class="form-group">
       <div class="label">Recipient:</div>
       <input type="text" value="Viewerade Limite" bind:this={recipient} readonly>
       <button class="copy-btn pointer" on:click={(e) => copyEvent(recipient, e.currentTarget)}>
            <svg width="13" height="15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M8.174 15H2.413C1.083 15 0 13.949 0 12.656v-7.94c0-1.292 1.082-2.343 2.413-2.343h5.761c1.33 0 2.413 1.051 2.413 2.344v7.94c0 1.292-1.082 2.343-2.413 2.343zM2.413 3.545c-.665 0-1.206.526-1.206 1.172v7.94c0 .645.54 1.171 1.206 1.171h5.761c.665 0 1.207-.526 1.207-1.172v-7.94c0-.645-.542-1.171-1.207-1.171H2.413zM13 11.19V2.344C13 1.05 11.918 0 10.587 0H3.891a.595.595 0 0 0-.603.586c0 .324.27.586.603.586h6.696c.665 0 1.207.526 1.207 1.172v8.847c0 .324.27.586.603.586a.595.595 0 0 0 .603-.586z" fill="#ABB3C6"></path></svg>
            <div class="help-block">
                Copied
            </div>
        </button>
   </div>
   <div class="form-group">
       <div class="label">IBAN:</div>
       <input type="text" value="GB13 TRWI 2314 7057 7253 4" bind:this={iban} readonly>
       <button class="copy-btn pointer" on:click={(e) => copyEvent(iban, e.currentTarget)}>
            <svg width="13" height="15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M8.174 15H2.413C1.083 15 0 13.949 0 12.656v-7.94c0-1.292 1.082-2.343 2.413-2.343h5.761c1.33 0 2.413 1.051 2.413 2.344v7.94c0 1.292-1.082 2.343-2.413 2.343zM2.413 3.545c-.665 0-1.206.526-1.206 1.172v7.94c0 .645.54 1.171 1.206 1.171h5.761c.665 0 1.207-.526 1.207-1.172v-7.94c0-.645-.542-1.171-1.207-1.171H2.413zM13 11.19V2.344C13 1.05 11.918 0 10.587 0H3.891a.595.595 0 0 0-.603.586c0 .324.27.586.603.586h6.696c.665 0 1.207.526 1.207 1.172v8.847c0 .324.27.586.603.586a.595.595 0 0 0 .603-.586z" fill="#ABB3C6"></path></svg>
            <div class="help-block">
                Copied
            </div>
        </button>
   </div>
   <div class="form-group">
       <div class="label">BIC:</div>
       <input type="text" value="TRWIGB2" bind:this={bic} readonly>
       <button class="copy-btn pointer" on:click={(e) => copyEvent(bic, e.currentTarget)}>
            <svg width="13" height="15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M8.174 15H2.413C1.083 15 0 13.949 0 12.656v-7.94c0-1.292 1.082-2.343 2.413-2.343h5.761c1.33 0 2.413 1.051 2.413 2.344v7.94c0 1.292-1.082 2.343-2.413 2.343zM2.413 3.545c-.665 0-1.206.526-1.206 1.172v7.94c0 .645.54 1.171 1.206 1.171h5.761c.665 0 1.207-.526 1.207-1.172v-7.94c0-.645-.542-1.171-1.207-1.171H2.413zM13 11.19V2.344C13 1.05 11.918 0 10.587 0H3.891a.595.595 0 0 0-.603.586c0 .324.27.586.603.586h6.696c.665 0 1.207.526 1.207 1.172v8.847c0 .324.27.586.603.586a.595.595 0 0 0 .603-.586z" fill="#ABB3C6"></path></svg>
            <div class="help-block">
                Copied
            </div>
        </button>
   </div>
   <div class="form-group">
      <div class="label" style="margin-top: 35px;">Reference:</div>
      <input type="text" value={order} bind:this={reference}  readonly style="border: 1px solid #6FB12F;">
      <button class="copy-btn pointer" on:click={(e) => copyEvent(reference, e.currentTarget)}>
           <svg width="13" height="15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M8.174 15H2.413C1.083 15 0 13.949 0 12.656v-7.94c0-1.292 1.082-2.343 2.413-2.343h5.761c1.33 0 2.413 1.051 2.413 2.344v7.94c0 1.292-1.082 2.343-2.413 2.343zM2.413 3.545c-.665 0-1.206.526-1.206 1.172v7.94c0 .645.54 1.171 1.206 1.171h5.761c.665 0 1.207-.526 1.207-1.172v-7.94c0-.645-.542-1.171-1.207-1.171H2.413zM13 11.19V2.344C13 1.05 11.918 0 10.587 0H3.891a.595.595 0 0 0-.603.586c0 .324.27.586.603.586h6.696c.665 0 1.207.526 1.207 1.172v8.847c0 .324.27.586.603.586a.595.595 0 0 0 .603-.586z" fill="#ABB3C6"></path></svg>
           <div class="help-block">
               Copied
           </div>
       </button>
   </div>
</div>
<div class="info-block df">
   <div class="ico">
       <img src="/image/checkout/warning.svg" alt="warning">
   </div>
   <div>
       <span style="color: #6FB12F">ATTENTION!</span> Please indicate this number as a Payment Reference for the bank transfer.
   </div>
</div>


<style lang="scss">
.title3{
  font-size: 16px;
  font-family: open_sansbold;
  color: #FFFFFF;
  margin-bottom: 15px;
}
.label{
  margin-top: 15px;
  margin-bottom: 5px;
}
.info-block{
  flex-wrap: nowrap;
  align-items: flex-start;
  font-size: 14px;
  font-style: italic;
  line-height: 21px;
  color: #818796;
  margin-top: 10px;
  margin-bottom: 40px;
  .ico{
    width: 15px;
    min-width: 15px;
    height: 15px;
    margin-right: 10px;
  }
}
.form-group{
    margin-bottom: 15px;
}
.tabs{
  .tab{
    font-size: 12px;
    font-family: open_sansbold;
    color: #FFFFFF;
    position: relative;
  }
}
.tab-content{
  display: none;
  &.open{
    display: block;
  }
}
</style>

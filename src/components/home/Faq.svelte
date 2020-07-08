<script>
const FAQ_OBJ = [
    {
        title: "Question Question Question Question Question Question?",
        descr: "Description Description Description Description Description Description Description Description Description Description Description Description Description Description Description Description Description Description Description Description Description Description"
    },
    {
        title: "Question Question Question Question Question Question?",
        descr: "Description Description Description Description Description Description Description Description Description Description Description Description Description Description Description Description Description Description Description Description Description Description"
    }
]
function openFaqTab(index) {
    if(faqCount == index){
        faqCount = undefined;
    }
    else {
        faqCount = index;
    }
}
let faqCount;
</script>

<div class="faq-wrapper">
    {#each FAQ_OBJ as faq, i}
        <div class:active={faqCount == i} class="faq-item">
            <div class="faq-btn df pointer" on:click={() => openFaqTab(i)}>
                {faq.title}
                <div class="plus">
                    <span class="line"></span>
                    <span class="line"></span>
                </div>
            </div>
            <div class="faq-content">
                {faq.descr}
            </div>
        </div>
    {/each}
</div>

<style lang="scss">
.faq-wrapper{
  max-width: 700px;
  padding: 0 10px;
  margin: auto;
  .faq-item{
    padding: 15px 20px;
    background: #27292F;
    border: 1px solid #2E3139;
    border-radius: 3px;
    margin-bottom: 15px;
    &:last-child{
      margin-bottom: 0;
    }
    &:not(.active):hover{
      background: #2E3037;
      border: 1px solid #383C46;
    }
    &.active{
      .faq-btn{
        color: #6FB12F;
        .plus{
          border: 1px solid #66725B;
          .line{
            background: #6FB12F;
            &:first-child{
              transform: translate(-50%, -50%) rotate(0);
            }
          }
        }
      }
      .faq-content{
        display: block;
      }
    }
    .faq-btn{
      font-family: open_sansbold;
      color: #FFFFFF;
      align-items: center;
      justify-content: space-between;
      flex-wrap: nowrap;
      .plus{
        width: 20px;
        height: 20px;
        border: 1px solid #474B56;
        border-radius: 100%;
        position: relative;
        min-width: 20px;
        margin-left: 20px;
        .line{
          display: inline-block;
          width: 8px;
          height: 2px;
          background: #858A97;
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          transition: all .3s;
          &:first-child{
           transform: translate(-50%, -50%) rotate(90deg);
          }
        }
      }
    }
    .faq-content{
      margin-top: 15px;
      font-size: 14px;
      line-height: 21px;
      color: #ABB3C6;
      display: none;
    }
  }
}

@media (max-width: 550px){
    .faq-wrapper .faq-item {
      .faq-btn{
        font-style: 14px;
      }
      .faq-content{
        font-size: 12px;
      }
    }
}
</style>

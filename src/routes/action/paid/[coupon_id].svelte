<script context="module">
	export async function preload(page, session) {
		const { coupon_id } = page.params;

		const res = await this.fetch(`/checkout/order-received/get-coupon?couponID=${coupon_id}`);
        if(res.status == 200){
            const coupon = await res.json();

    		return { coupon };
        }

        this.error(404, 'Not found');
	}
</script>

<script>
import lottie from "../../../action/lottie";

export let coupon;
</script>

<div class="ipaid-wrapper mw">
    <div class="mw700">
        <div class="icon">
            <div id="anim-check" use:lottie={[false, "/animations/check.json"]}></div>
        </div>
        <h1 class="title1">Your order in process</h1>
        <div class="price">
            Crypto Voucher <span class="opt">{coupon.currentCoupon.price} {coupon.currentCoupon.currencyName}</span>
        </div>
        <div class="order-info">
            <div class="item">
                Total: <span class="opt">{coupon.currentCoupon.prettyPrice}</span>
            </div>
            <div class="item">
                Order date: <span class="opt">{coupon.currentCoupon.date}</span>
            </div>
            <div class="item">
                Order Number: <span class="opt">{coupon.currentCoupon.order}</span>
            </div>
        </div>
        <div class="title2">
            После успешной оплаты, мы постараемся как можно скорее отправить вам код ваучера в личный кабинет и на емаил.н
        </div>
        <div class="title3">
            <span class="opt">NOTE!</span> Оплата может осуществляться несколько рабочих дней
        </div>
    </div>
</div>


<style lang="scss">
.ipaid-wrapper{
  background: url(../image/ipaid/bkg.png) top left no-repeat #1e1f24;
  padding: 80px 0;
  text-align: center;

  .icon{
    background: url('/image/ipaid/item1.svg') center no-repeat;
    background-size: 100% 100%;
    margin: auto;
    margin-bottom: 20px;
    width: 90px;
    height: 90px;
    display: flex;
    align-items: center;
    justify-content: center;
    #anim-check{
      width: 35px;
      height: 35px;
      margin-bottom: 11px;
      margin-left: 2px;
      transform: rotate(-2deg);
    }
  }
  .title1{
    font-family: open_sansbold;
    font-size: 36px;
    text-align: center;
    color: #FFFFFF;
    margin-bottom: 40px;
  }
  .price{
    font-size: 16px;
    font-family: open_sansbold;
    color: #FFFFFF;
    max-width: 500px;
    margin: auto;
    margin-bottom: 30px;
    .opt{
      font-size: 16px;
      color: #6FB12F;
    }
  }
  .order-info{
    max-width: 500px;
    margin: auto;
    margin-bottom: 40px;
    .item{
      font-size: 14px;
      color: #818796;
      margin-bottom: 5px;
      .opt{
        font-size: 14px;
        color: #BCC3D1;
      }
    }
  }
  .title2{
    font-size: 14px;
    color: #BCC3D1;
    max-width: 500px;
    margin: auto;
    margin-bottom: 20px;
  }
  .title3{
    font-family: open_sansregular;
    max-width: 500px;
    margin: auto;
    font-size: 14px;
    font-style: italic;
    color: #818796;
    .opt{
      color: #6FB12F;

    }
  }
}
</style>

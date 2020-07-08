<script>
import lottie from "../../../action/lottie";

export let prettyPrice;
export let cryptoInfo;
export let redeemDate;
export let wallet;
export let cryptoCount;


let _date = new Date(redeemDate);
let monthDate = _date.getMonth() > 9 ? _date.getMonth() + 1 : `0${_date.getMonth() + 1}`;
let dayDate = _date.getDate() > 9 ? _date.getDate() : `0${_date.getDate()}`;
let hoursDate = _date.getHours() > 9 ? _date.getHours() : `0${_date.getHours()}`;
let minutesDate = _date.getMinutes() > 9 ? _date.getMinutes() : `0${_date.getMinutes()}`;
</script>

<div class="success-page mw">
    <div class="mw700">
        <div id="anim-success" use:lottie={[false, '/animations/success.json']}></div>
        <div class="success-wrapper">
            <div class="icon">
                <div id="anim-check" use:lottie={[false, '/animations/check.json']}></div>
            </div>
            <h1 class="title1">Successfully Redeemed!</h1>
            <div class="price">
                Crypto Coupon  <span class="opt">{prettyPrice}</span> = <span class="opt">{cryptoCount}{cryptoInfo.shortName} </span>
            </div>
            <div class="order-info">
                <div class="item">
                    Redeem date: <span class="opt">{_date.getFullYear()}-{monthDate}-{dayDate} {hoursDate}:{minutesDate}</span>
                </div>
                <div class="item">
                    {cryptoInfo.cryptoName} wallet address: <span class="opt">{wallet}</span>
                </div>
            </div>
            <a href="/my-account/my-vouchers" class="greenBkgBtn redeem-btn">Redeem Another Coupon</a>
        </div>
    </div>
</div>


<style lang="scss">
.success-page{
  background: url("/image/ipaid/bkg.svg") #1E1F24;
  padding: 80px 0;
  text-align: center;
  position: relative;
  #anim-success{
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    z-index: 1;
  }
  .success-wrapper{
    position: relative;
    z-index: 2;
  }
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
  .redeem-btn{
    width: 230px;
    padding: 10px;
    margin: auto;
    margin-top: 70px;
    display: block;
  }
}
</style>

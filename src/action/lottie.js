import lottie from "lottie-web";


export default function(node, options){
    let lottieObj = lottie.loadAnimation({
       container: node, // the dom element that will contain the animation
       renderer: 'svg',
       loop: options[0],
       autoplay: true,
       path: options[1]
   });

   return {
       update(newOptions){
           if(options != newOptions){
               lottieObj.destroy()
               lottieObj = lottie.loadAnimation({
                  container: node, // the dom element that will contain the animation
                  renderer: 'svg',
                  loop: newOptions[0],
                  autoplay: true,
                  path: newOptions[1]
              });

              options = newOptions
           }
       },
       destroy(){
           lottieObj.destroy()
       }
   }
}

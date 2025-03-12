import "../lib/smooth";
import "./styles/style.css";
import { markers } from "../lib/smooth";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
// import { Draggable } from "gsap/Draggable";
// import { MotionPathPlugin } from "gsap/MotionPathPlugin";

gsap.registerPlugin(ScrollTrigger);
// ,Draggable,MotionPathPlugin

let left = gsap.utils.distribute({
  base: 0,
  amount: 990,
  // from: "center",
  // to: "center",
});

let right = gsap.utils.distribute({
  base: -990,
  amount: 990,
  // from: "center",
  // to: "center",
});


const tl = gsap.timeline();

tl.from('.card_container .left',{ x: left })
tl.from('.card_container .right',{ x: right },'<')
 





/* 카드 고정시키기 & About 커지기 */
ScrollTrigger.create({
  trigger: ".card_container",
  start: "2800px top",
  end: "+=1100",
  // markers:true,
  animation:gsap.to('.title',{ scale:1,y:'-400%' }),
  pin: true,
  scrub: true,
});







ScrollTrigger.create({
  trigger: ".text",
  start: "2550px top",
  end: "+=1300",
  // markers:true,
  pin: true,
  scrub: true,
});



// /* 카테고리 고정시키기 */
// ScrollTrigger.create({
//   trigger: ".section01",
//   start: "80%",
//   end: "+=1000",
//   animation:gsap.to('.text',{filter:'blur(10px)',autoAlpha:0}),
//   // markers:true,
//   scrub: true,
// });




/* 첫 번째 카드 모으기 */
ScrollTrigger.create({
  trigger: ".scene01",
  start: "top top",
  end: "+=3000",
  animation: tl,
  // markers:true,
  pin: true,
  scrub: true,
});






/* 카테고리 고정시키기 */
ScrollTrigger.create({
  trigger: ".category",
  start: "top center",
  end: "+=1500",
  pin: true,
  // markers:true,
  scrub: true,
});



ScrollTrigger.create({
  trigger: ".section01",
  start: "85%",
  end: "+=1300",
  animation:gsap.to('.title',{filter:'blur(10px)',autoAlpha:0}),
  // markers:true,
  scrub: true,
});





/* 키워드 텍스트 고정시키기 */
ScrollTrigger.create({
  trigger: ".scene02",
  start: "2900px top",
  end: "+=1100",
  markers:true,
  // animation:gsap.to('.text_keywords',{ scale:1,y:'-400%' }),
  pin: true,
  scrub: true,
});





/* section1-1 card animation  */

ScrollTrigger.create({
  trigger: ".section1-1",
  start: "170px top",
  end: "+=1800",
  // markers:true,
  animation:gsap.to('.color > li',{stagger:0.1, filter:'blur(0)',y:0, opacity:1 }),
  pin: true,
  scrub: true,
});





ScrollTrigger.create({
  trigger: ".bg_text",
  start: "30px top",
  end: "+=5100",
  // markers:true,
  // animation:gsap.to('.title',{ scale:1,y:'-400%' }),
  // pinSpacing:false,
  pin: true,
  scrub: true,
});



// section03


gsap.utils.toArray('.promotion').forEach((item,index)=>{
  
  ScrollTrigger.create({
    trigger: item,
    start: `-${70 * index}px top`,
    endTrigger:'.section03',
    end:'bottom bottom',
    pin: true,
    pinSpacing: false,
    // markers: true,
    snap:{
      snapTo: 1,
      duration:0.3,
      ease: "power1.inOut"
    },
    // snap: section - 
    // scrub: true,
  })
})









markers();

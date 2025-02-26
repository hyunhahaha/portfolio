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
  // animation:gsap.to('.title',{ scale:1,y:'-400%' }),
  pin: true,
  scrub: true,
});
 


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


/* 카테고리 고정시키기 */
ScrollTrigger.create({
  trigger: ".section01",
  start: "100%",
  end: "+=1600",
  animation:gsap.to('.title',{filter:'blur(10px)',autoAlpha:0}),
  // markers:true,
  scrub: true,
});



/* 카테고리 고정시키기 */
ScrollTrigger.create({
  trigger: ".section01",
  start: "80%",
  end: "+=1000",
  animation:gsap.to('.text',{filter:'blur(10px)', x:'50%',autoAlpha:0}),
  // markers:true,
  scrub: true,
});







ScrollTrigger.create({
  trigger: ".bg_text",
  start: "20px top",
  end: "+=3000",
  markers:true,
  // animation:gsap.to('.title',{ scale:1,y:'-400%' }),
  pin: true,
  scrub: true,
});
















markers();

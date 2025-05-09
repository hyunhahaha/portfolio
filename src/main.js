import "../lib/smooth";
import "./styles/style.css";
import { markers } from "../lib/smooth";
import { engine, tl as barTl } from "./matter";
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

tl.from(".card_container .left", { x: left });
tl.from(".card_container .right", { x: right }, "<");

/* 카드 고정시키기 & About 커지기 */
ScrollTrigger.create({
  trigger: ".card_container",
  start: "2600px top",
  end: "+=1400",
  // markers:true,
  animation: gsap.to(".title", { scale: 1, y: "-400%" }),
  pin: true,
  scrub: true,
});

ScrollTrigger.create({
  trigger: ".text",
  start: "300vh top",
  end: "+=1300",
  // markers: true,
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
  start: "top top",
  end: "+=1500",
  pin: true,
  // markers:true,
  onEnter() {
    engine.world.gravity.y = 1;
    barTl.play();
  },
  scrub: true,
});

ScrollTrigger.create({
  trigger: ".section01",
  start: "85%",
  end: "+=1300",
  animation: gsap.to(".title", { filter: "blur(10px)", autoAlpha: 0 }),
  // markers:true,
  scrub: true,
});

/* section1-1 card animation  */

ScrollTrigger.create({
  trigger: ".section1-1",
  start: "170px top",
  end: "+=1800",
  // markers:true,
  animation: gsap.to(".color > li", {
    stagger: 0.1,
    filter: "blur(0)",
    y: 0,
    opacity: 1,
  }),
  pin: true,
  scrub: true,
});

ScrollTrigger.create({
  trigger: ".bg_text",
  start: "80px top",
  end: "+=5600",
  // markers:true,
  // animation:gsap.to('.title',{ scale:1,y:'-400%' }),
  // pinSpacing:false,
  pin: true,
  scrub: true,
});


ScrollTrigger.create({
  trigger: ".career",
  start: "20vw center",
  end: "+=1200",
  // markers:true,
  animation: gsap.from(".ani", { y: 30, opacity: 0, stagger: 0.1 }),
  // pinSpacing:false,
  // pin: true,
  scrub: true,
});

// section03

gsap.utils.toArray(".promotion").forEach((item, index) => {
  ScrollTrigger.create({
    trigger: item,
    start: `-${90 * index}px top`,
    endTrigger: ".section03",
    end: "bottom bottom",
      // markers:true,
    pin: true,
    pinSpacing: false,
  });
});










markers();

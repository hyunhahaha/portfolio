import "../lib/smooth";
import "./styles/style.css";
import { markers } from "../lib/smooth";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
// import { Draggable } from "gsap/Draggable";
// import { MotionPathPlugin } from "gsap/MotionPathPlugin";

gsap.registerPlugin(ScrollTrigger);
// ,Draggable,MotionPathPlugin

let end = gsap.utils.distribute({
  base: 0,
  amount: 350,
  ease: "power3.inOut",
  to: "center",
});

const tween = gsap.to(".card_container li", {
  stagger: {
    from: "center",
    each: 0.05,
  },
  x: 1000,
});

// const tween = gsap.to('.card_container li',{ x: 100 })

ScrollTrigger.create({
  trigger: ".section01",
  start: "top top",
  end: "+=3000",
  animation: tween,
  pin: true,
  scrub: true,
});




ScrollTrigger.create({
  trigger: ".title",
  start: "top top",
  end: "+=2000",
  animation: gsap.to('.aboutme .title',{ scale: 1 }),
  pin: true,
  scrub: true,
});














markers();

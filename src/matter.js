import Matter from "matter-js";
import { gsap } from 'gsap';



// module aliases
let Engine = Matter.Engine,
    Render = Matter.Render,
    Runner = Matter.Runner,
    Body = Matter.Body,
    Bodies = Matter.Bodies,
    Composite = Matter.Composite,
    MouseConstraint = Matter.MouseConstraint,
    Mouse = Matter.Mouse;

// create an engine
let engine = Engine.create();

// create a renderer
let render = Render.create({
    element: document.querySelector('.float'),
    engine: engine,
    options:{
      width:innerWidth,
      height:innerHeight,
      background: '#222',
      wireframeBackground: '#222',
      wireframes: true,
      // showAngleIndicator: true

    }
});

const xCenter = innerWidth/2;

const img = new Image();
img.src = '/section01/adventurous.png';

// create two boxes and a ground
let boxA = Bodies.rectangle(400, 200, 80, 80);
let boxB = Bodies.rectangle(xCenter, 50, 424, 83,{
  chamfer: {
    radius: [40, 40] // border-radius 설정이 가능합니다.
  },
  render:{
    sprite:{
      texture:img.src,
      // xScale:1,
      // yScale:1
    }
  }
});

let ground = Bodies.rectangle(xCenter, 610, 810, 1, { isStatic: true });


const tl = gsap.timeline({repeat: -1, yoyo: true});
const direction = {
  left:-0.05,
  right:0.05,
}
// ground를 90도(π/2 라디안)까지 회전 후 원위치
tl.to({rotation: direction.left}, {
  rotation: direction.right, // 45도 회전
  duration: 2,
  ease: "power2.inOut",
  onUpdate() {
    
    Body.setAngle(ground, this.targets()[0].rotation);
  }
}).to({rotation: direction.right}, {
  rotation: direction.left, // 원위치로
  duration: 2,
  ease: "power2.inOut",
  onUpdate() {
    Body.setAngle(ground, this.targets()[0].rotation);
  }
});



let mouse = Mouse.create(render.canvas),
mouseConstraint = MouseConstraint.create(engine, {
    mouse: mouse,
    constraint: {
        stiffness: 0.5,
        render: {
            visible: false
        }
    }
});

Composite.add(engine.world, mouseConstraint);

// keep the mouse in sync with rendering
render.mouse = mouse;


// add all of the bodies to the world
Composite.add(engine.world, [boxA, boxB, ground]);

// run the renderer
Render.run(render);

// create runner
let runner = Runner.create();

// run the engine
Runner.run(runner, engine);








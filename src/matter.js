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
      wireframes: false,
      // showAngleIndicator: true

    }
});

const category = [
  {
    content:'adventurous',
    width:424,
    height:83,
    img:"/section01/adventurous.png",
    x:0,
    y:0
  },
  {
    content:'bright',
    width:239,
    height:83,
    img:"/section01/bright.png",
    x:0,
    y:0
  },
  {
    content:'ENFJ',
    width:224,
    height:83,
    img:"/section01/ENFJ.png",
    x:0,
    y:0
  },
  {
    content:'flexible',
    width:285,
    height:83,
    img:"/section01/flexible.png",
    x:0,
    y:0
  },
  {
    content:'passionate',
    width:371,
    height:83,
    img:"/section01/passionate.png",
    x:0,
    y:0
  },
]


const arr = [];
const xCenter = innerWidth/2;

category.forEach((item, i) => {
  const img = new Image();
  img.onload = function() {

    const body = Bodies.rectangle(xCenter, 600, item.width, item.height, {
      chamfer: {
        radius: [40, 40],
      },
      
      render: {
        sprite: {
          texture: this.src,
        },
      },
    });
    
    // 각 Body를 개별적으로 추가
    Composite.add(engine.world, body);
    arr.push(body);

    
  };
  img.src = item.img;
});




// const tags = category.map((item,i)=>{
//   return Bodies.rectangle(xCenter, 600, 424, 83,{
//     ...options,
//     ...options.render.sprite.texture = createImage(i)
//    });
// })



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
Composite.add(engine.world, [ ground]);

// run the renderer
Render.run(render);

// create runner
let runner = Runner.create();

// run the engine
Runner.run(runner, engine);








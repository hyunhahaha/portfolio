import Matter from "matter-js";
import { gsap } from "gsap";
import { scrollbar } from "../lib/smooth";

// module aliases
export const Engine = Matter.Engine,
  Render = Matter.Render,
  Runner = Matter.Runner,
  Body = Matter.Body,
  Bodies = Matter.Bodies,
  Composite = Matter.Composite,
  MouseConstraint = Matter.MouseConstraint,
  Mouse = Matter.Mouse;

// create an engine
export let engine = Engine.create();

// create a renderer
let render = Render.create({
  element: document.querySelector(".float"),
  engine: engine,
  options: {
    width: innerWidth,
    height: innerHeight,
    background: "#000",
    wireframeBackground: "#222",
    wireframes: false,
    // showAngleIndicator: true
  },
});

const category = [
  {
    content: "Moral",
    width: 228,
    height: 83,
    img: "/section01/moral.png",
    x: 50,
    y: -2,
  },

  {
    content: "Bright",
    width: 239,
    height: 83,
    img: "/section01/bright.png",
    x: -80,
    y: -20,
  },

  {
    content: "Flexible",
    width: 285,
    height: 83,
    img: "/section01/flexible.png",
    x: 0,
    y: -1,
  },
  {
    content: "ENFJ",
    width: 224,
    height: 83,
    img: "/section01/ENFJ.png",
    x: -150,
    y: 0,
  },
  {
    content: "Passionate",
    width: 371,
    height: 83,
    img: "/section01/passionate.png",
    x: 150,
    y: 0,
  },
  {
    content: "Adventurous",
    width: 424,
    height: 83,
    img: "/section01/adventurous.png",
    x: 0,
    y: 10,
  },
];

const xCenter = innerWidth / 2;

const tags = category.map((item) => {
  return Bodies.rectangle(
    xCenter + item.x,
    400 + item.y,
    item.width,
    item.height,
    {
      chamfer: {
        radius: [40, 40],
      },
      render: {
        fillStyle: "transparent", // 내부 색상
        strokeStyle: "white", // 테두리 색상
        lineWidth: 2, // 테두리 두께
      },
    }
  );
});

const pink = Bodies.circle(xCenter, -500, 20, {
  render: {
    fillStyle: "pink", // 내부 색상
  },
});

category.forEach((item, i) => {
  Matter.Events.on(render, "afterRender", () => {
    const context = render.context;
    const tag = tags[i];

    context.save(); // 현재 상태 저장

    // 캔버스의 원점을 태그의 중심으로 이동
    context.translate(tag.position.x, tag.position.y);
    context.rotate(tag.angle); // 바디의 회전 적용

    // 텍스트 스타일 적용
    context.font = "35px Arial";
    context.fillStyle = "white";
    context.textAlign = "center";

    // 텍스트 그리기 (이전 원점으로 조정)
    context.fillText(item.content, 0, 8);

    context.restore(); // 이전 상태 복원
  });
});

let Y = 900;

let ground = Bodies.rectangle(xCenter, Y, innerWidth, 1, { isStatic: true });
const green = Bodies.circle(xCenter, Y + 20, 20, {
  render: {
    fillStyle: "green", // 내부 색상
  },
  isStatic: true,
});

export const tl = gsap.timeline({ paused: true, repeat: -1, yoyo: true });
const direction = {
  left: -0.05,
  right: 0.05,
};
// ground를 90도(π/2 라디안)까지 회전 후 원위치
tl.to(
  { rotation: direction.left },
  {
    rotation: direction.right, // 45도 회전
    duration: 2,
    ease: "power2.inOut",
    onUpdate() {
      Body.setAngle(ground, this.targets()[0].rotation);
    },
  }
).to(
  { rotation: direction.right },
  {
    rotation: direction.left, // 원위치로
    duration: 2,
    ease: "power2.inOut",
    onUpdate() {
      Body.setAngle(ground, this.targets()[0].rotation);
    },
  }
);

let mouse = Mouse.create(render.canvas),
  mouseConstraint = MouseConstraint.create(engine, {
    mouse: mouse,
    constraint: {
      stiffness: 0.5,
      render: {
        visible: false,
      },
    },
  });

// 부드러운 스크롤을 위한 설정
let scrollAmount = 0;
let scrollAnimationId = null;

render.canvas.addEventListener(
  "wheel",
  (e) => {
    // 기본 wheel 이벤트 동작 방지
    e.preventDefault();

    // 스크롤 양 누적 (부드러운 효과를 위해)
    scrollAmount += e.deltaY;

    // 이미 애니메이션 프레임이 요청되어 있다면 추가 요청하지 않음
    if (!scrollAnimationId) {
      // 부드러운 스크롤 애니메이션 시작
      smoothScroll();
    }
  },
  { passive: false }
);

// 부드러운 스크롤 애니메이션 함수
function smoothScroll() {
  // 현재 스크롤 위치
  const { offset } = scrollbar;

  // 스크롤 양의 일부만 적용하여 부드럽게 이동
  const easing = 0.1; // 값이 작을수록 더 부드럽게 이동 (0.05~0.15 사이 값 추천)
  const delta = scrollAmount * easing;

  // 스크롤 애니메이션 적용
  scrollbar.scrollTo(offset.x, offset.y + delta);

  // 남은 스크롤 양 업데이트
  scrollAmount -= delta;

  // 스크롤 양이 충분히 작아지면 애니메이션 종료
  if (Math.abs(scrollAmount) > 0.5) {
    scrollAnimationId = requestAnimationFrame(smoothScroll);
  } else {
    scrollAnimationId = null;
    scrollAmount = 0;
  }
}

Composite.add(engine.world, mouseConstraint);
render.mouse = mouse;

Composite.add(engine.world, [...tags, pink, ground, green]);

export let runner = Runner.create();

Render.run(render);
Runner.run(runner, engine);

engine.world.gravity.y = 0;

setTimeout(() => {
  // engine.world.gravity.y = 1;
}, 500);

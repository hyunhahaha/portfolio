import Scrollbar from 'smooth-scrollbar';
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
// const options = {
//   damping: 0.1,
//   // thumbMinSize: number,
//   // renderByPixels: boolean,
//   // alwaysShowTracks: boolean,
//   // continuousScrolling: boolean,
//   // wheelEventTarget: EventTarget | null,
//   // plugins: any,
// }

// Scrollbar.init(document.querySelector('#scroll-container'), options);




gsap.registerPlugin(ScrollTrigger);


class DisableScroll extends Scrollbar.ScrollbarPlugin{
  static pluginName = 'DisableScroll'

  transformDelta(delta){

    delta['x'] = 0;

    return delta;

  }
}

Scrollbar.use(DisableScroll)



const container = document.querySelector('#scroll-container');

const options = {
  damping: 0.1,
  alwaysShowTracks: true,
};
const scrollbar = Scrollbar.init(container, {
  ...options,
});


scrollbar.track.xAxis.element.remove();




ScrollTrigger.scrollerProxy(container, {
  scrollTop(value) {
    if (arguments.length) {
      scrollbar.scrollTop = value; // setter
    }
    return scrollbar.scrollTop; // getter
  },
});


scrollbar.addListener(ScrollTrigger.update);
ScrollTrigger.defaults({ scroller: container });



export const markers = () => {

  if (document.querySelector('.gsap-marker-scroller-start')) {
    const markers = gsap.utils.toArray('[class *= "gsap-marker"]');

    scrollbar.addListener(({ offset }) => {
      gsap.set(markers, { marginTop: -offset.y});
    });
  }

}

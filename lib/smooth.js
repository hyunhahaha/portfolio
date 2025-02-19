import Scrollbar from 'smooth-scrollbar';

const options = {
  damping: 0.1,
  // thumbMinSize: number,
  // renderByPixels: boolean,
  // alwaysShowTracks: boolean,
  // continuousScrolling: boolean,
  // wheelEventTarget: EventTarget | null,
  // plugins: any,
}

Scrollbar.init(document.querySelector('#scroll-container'), options);
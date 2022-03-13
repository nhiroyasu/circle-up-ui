// Import stylesheets
import './style.css';
import anime from 'animejs';
import { applyByContent, applyInitView } from './ui.js';
import { contents } from './static.js';

const PHONE_WIDTH = 360;

class CirclePosition {
  constructor(radius, separation) {
    this.radius = radius;
    this.separation = separation;
  }

  calcX(index) {
    return (
      Math.cos(
        (index * (360 / this.separation) * Math.PI) / 180 - Math.PI / 2
      ) * this.radius
    );
  }

  calcY(index) {
    return (
      Math.sin(
        (index * (360 / this.separation) * Math.PI) / 180 - Math.PI / 2
      ) * this.radius
    );
  }
}

let circlePosition = new CirclePosition(PHONE_WIDTH, 6);

const BUTTON_WIDTH = 240;
const BUTTON_HEIGHT = 60;
anime({
  targets: '.button',
  top: (target, index, length) => {
    return circlePosition.calcY(index) + BUTTON_HEIGHT / 4 + 480;
  },
  left: (target, index, length) => {
    return circlePosition.calcX(index) + BUTTON_WIDTH / 4;
  },
  easing: 'linear',
  duration: 0,
});

function buildCircleAnimation(count) {
  let circleAnimation = anime({
    autoplay: false,
    targets: '.button',
    top: (target, index, length) => {
      let reIndex = index + (count % length);
      return circlePosition.calcY(reIndex) + BUTTON_HEIGHT / 4 + 480;
    },
    left: (target, index, length) => {
      let reIndex = index + (count % length);
      return circlePosition.calcX(reIndex) + BUTTON_WIDTH / 4;
    },
    easing: 'easeOutCubic',
    duration: 300,
  });
  return circleAnimation;
}

var stateCount = 0;
let debugStartButton = document.getElementById('start-button');
debugStartButton.addEventListener('click', () => {
  stateCount += 1;
  let ani = buildCircleAnimation(-stateCount);
  ani.play();

  applyByContent(contents[stateCount % contents.length]);
});

applyInitView(contents);
applyByContent(contents[0]);

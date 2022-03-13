import { Content } from './content.js';
import anime from 'animejs';

const detailContent = document.getElementById('detail-content');
const circleObj = document.getElementById('circle-obj');
const titleDom = document.getElementById('title');
const descriptionDom = document.getElementById('description');
const buttons = document.getElementsByClassName('button');

/**
 * @param content {Content}
 */
export function applyByContent(content) {
  titleDom.innerText = content.title;
  descriptionDom.innerText = content.description;
  anime({
    targets: '.detail-content',
    backgroundColor: content.contentColor,
    duration: 300,
    easing: 'easeOutCubic',
  });
  anime({
    targets: '.circle-obj',
    backgroundColor: content.backgroundColor,
    duration: 300,
    easing: 'easeOutCubic',
  });
}

/**
 * @param contents {Array<Content>}
 */
export function applyInitView(contents) {
  contents.forEach((content, index) => {
    let button = buttons[index];
    button.innerText = content.title;
    button.style.backgroundColor = content.backgroundColor;
    button.style.color = content.foregroundColor;
  });
}

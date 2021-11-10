import * as React from 'react';
import {render} from 'react-dom';
import Routes from './Routes';
import 'core-js';
import 'regenerator-runtime';
import Notifier from '../components/shared/Notifier/Notifier';
import {renderToString} from 'react-dom/server';


window.notify = (variant: 'err' | 'success' | 'warn', text: string) => {
  const notifyBlock = document.getElementById('notify-block');
  if (notifyBlock) {

    if (notifyBlock.children.length === 3) {
      return;
    }

    const htmlMarkup = renderToString(
      <Notifier
        variant={variant}
        text={text}
      />);

    const elem = document.createElement('div');
    elem.innerHTML = htmlMarkup;

    const notifier = elem.firstChild as HTMLDivElement;

    notifyBlock.appendChild(notifier);

    if (notifyBlock.children.length > 1) {
      for (let i = 0; i < notifyBlock.children.length - 1; i++) {
        const child = notifyBlock.children[i] as HTMLDivElement;
        const childTop = child.getBoundingClientRect().top;
        child.style.top = `${60 + childTop}px`;
      }
    }

    const notifierWidth = notifier.offsetWidth;

    notifier.style.left = `calc(100% - ${notifierWidth}px - 30px)`;

    setTimeout(() => {
      notifier.style.left = '100%';
      setTimeout(() => notifyBlock.removeChild(notifier), 500);
    }, 3500);
  }
};


render(<Routes />, document.getElementById('app'));
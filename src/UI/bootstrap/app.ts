import '../styles/index.scss';
import pageManager from '../pages/PageManager';
import initProviders from './providers';
import themeToggler from '../components/theme/toggler';
// import sampleData from '../components/sampleData';
// import { generateFeed } from './bus';

initProviders();

themeToggler.register();

// sampleData().then(console.log).catch(console.log);
// generateFeed(300).then(console.log).catch(console.log);

window.addEventListener('DOMContentLoaded', () => {
  // TODO Component?
  document.querySelectorAll(`[to]`).forEach((element) => {
    element.addEventListener('click', () => {
      pageManager.render(element.getAttribute('to') as string);
    });
  });

  pageManager.render('home');
});

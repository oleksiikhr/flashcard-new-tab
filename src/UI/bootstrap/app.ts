import '../styles/index.scss';
import pageManager from '../pages/PageManager';
import initProviders from './providers';
import themeToggler from '../components/theme/toggler';

initProviders();

themeToggler.register();

window.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll(`[to]`).forEach((element) => {
    element.addEventListener('click', () => {
      pageManager.render(element.getAttribute('to') as string);
    });
  });

  pageManager.render('home');
});

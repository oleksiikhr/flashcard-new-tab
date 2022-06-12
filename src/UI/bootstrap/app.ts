import HomePage from '../pages/HomePage';
import '../styles/index.scss';
import pageManager from '../pages/PageManager';
import initProviders from './providers';
import { findTheme } from './bus';
import { log } from '../../Domain/Shared/Util/logger';

initProviders();

log('theme', findTheme());

window.addEventListener('DOMContentLoaded', () => {
  pageManager.setPage(HomePage);
});

import CardMemento from '../Service/CardMemento';
import { cardContentFactory } from './cardContentFactory';

const cardMemento = new CardMemento(cardContentFactory);

export { cardMemento };

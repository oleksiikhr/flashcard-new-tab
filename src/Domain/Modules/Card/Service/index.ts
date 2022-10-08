import CardMemento from './CardMemento';
import { cardContentFactory } from '../Adapter/cardContentFactory';

const cardMemento = new CardMemento(cardContentFactory);

export { cardMemento };
